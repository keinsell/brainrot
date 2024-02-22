import {
	DynamicModule,
	ExecutionContext,
	Injectable,
	MiddlewareConsumer,
	NestMiddleware,
	NestModule,
	Type,
    createParamDecorator,
    mixin,
}                      from '@nestjs/common'
import ua from 'useragent'
import murmurhash from 'murmurhash3js'
import requestIp from 'request-ip'
import {NextFunction, Request, Response} from 'express'
import cookieParser from 'cookie-parser'

/**
 * Generate a fingerprint for the given request and parameters.
 *
 * @param {Request} req - The request object.
 * @param {Parameters[]} params - An array of parameters.
 * @return {object} - An object containing the generated fingerprint.
 */
function generateFingerprint(
	req: Request,
	params: Parameters[]
): IFingerprint {
	params = uniqueParams(params);
	if (params.length === 0) {
		params = ["ipAddress"];
	}
	const object = params.reduce((ojb, param) => {
		// @ts-ignore
		ojb[param] = paramHandler[param](req);
		return ojb;
	}, {});
	const id = murmurhash.x64.hash128(JSON.stringify(object));
	return {
		id,
		...object,
	} as IFingerprint;
}

const paramHandler = {
	/**
	 * Extracts the accept and language headers from the request headers.
	 *
	 * @param {Request} req - the request object containing headers
	 * @return {AcceptHeader} - an object with the accept and language headers
	 */
	headers: (req: Request): AcceptHeader => {
		const { headers } = req;

		return {
			//@ts-ignore
			accept: headers["accept"],
			//@ts-ignore
			language: headers["accept-language"],
			//@ts-ignore
			encoding: headers["accept-encoding"],
		};
	},
	/**
	 * Retrieves the IP address from the request object.
	 *
	 * @param {Request} req - The HTTP request object.
	 * @return {IpAddress} The IP address value.
	 */
	ipAddress: (req: Request): IpAddress => {
		const ip = requestIp.getClientIp(req);
		return {
			value: ip || "0.0.0.0",
		};
	},

	/**
	 * Returns the user agent information parsed from the request headers.
	 *
	 * @param {Request} req - The request object.
	 * @return {Object} The user agent information.
	 */
	userAgent: (req: Request): UserAgent => {
		const agent = ua.parse(req.headers["user-agent"]);
		return {
			browser: {
				family: agent.family,
				version: agent.major,
			},
			device: {
				family: agent.device.family,
				version: agent.device.major,
			},
			os: {
				family: agent.os.family,
				major: agent.os.major,
				minor: agent.os.minor,
			},
		};
	},
};

export const RealIp = createParamDecorator(
	(_, ctx: ExecutionContext): string => {
		const request: Request & { fp: IFingerprint } = ctx
			.switchToHttp()
			.getRequest();
		return request.fp.ipAddress.value;
	}
);

/**
 * Get fingerprint by request
 */
export const Fingerprint = createParamDecorator(
	(_, ctx: ExecutionContext): IFingerprint => {
		const request: Request = ctx
			.switchToHttp()
			.getRequest();

		return (request as any).fingerprint;
	}
);

/**
 * Returns an array of unique parameters by removing duplicate elements.
 *
 * @param {Parameters[]} params - The array of parameters to be made unique.
 * @return {Array} - An array of unique parameters.
 */
export default function uniqueParams(params: Parameters[]) {
	return Array.from(new Set(params));
}

export function fingerprintMiddleware(
	options: ModuleConfigs
): Type<NestMiddleware> {
	@Injectable()
	class Middleware implements NestMiddleware {
		async use(req: Request, res: Response, next: NextFunction) {
			const { params } = options;
			const { name, httpOnly, domain } = options.cookieOptions || {};

			// @ts-ignore
			const fp = generateFingerprint(req, params);

			// @ts-ignore
			req.fingerprint = fp;

			const cookieName = name || DEFAULT_COOKIE_NAME;

			const requestCookie = req.cookies[cookieName];
			if (!requestCookie || requestCookie !== fp.id) {
				res.cookie(cookieName, fp.id, {
					httpOnly,
					domain,
				});
			}
			next();
		}
	}
	return mixin(Middleware);
}

export interface ModuleConfigs {
	params?: Parameters[];
	cookieOptions?: {
		name?: string;
		httpOnly?: boolean;
		domain?: string;
	};
}

export const defaultModuleConfigs: ModuleConfigs = {
	params: ["ipAddress", "headers", "userAgent"],
	cookieOptions: {
		name: "fp",
		httpOnly: true,
	},
};

export type Parameters = "headers" | "userAgent" | "ipAddress";

export interface AcceptHeader {
	accept: string;
	language: string;
	encoding: string;
}

export interface IpAddress {
	value: string;
}

export interface UserAgent {
	browser: {
		family: string;
		version: string;
	};
	device: {
		family: string;
		version: string;
	};
	os: {
		family: string;
		major: string;
		minor: string;
	};
}

export interface IFingerprint extends AcceptHeader, UserAgent, IpAddress {
	id: string;
	headers: AcceptHeader;
	userAgent: UserAgent;
	ipAddress: IpAddress;
}

export const DEFAULT_COOKIE_NAME = "fp";


export class FingerprintModule
	implements NestModule
{
	private static configs: ModuleConfigs

	/**
	 * Initializes the root module of the application.
	 *
	 * @param configs - The configuration options for the module. Defaults to `defaultModuleConfigs`.
	 * @returns A promise that resolves to an object containing the module configuration.
	 */
	static async forRoot(configs: ModuleConfigs = defaultModuleConfigs): Promise<DynamicModule>
	{
		// Set the module configuration
		this.configs = configs

		// Return the module configuration
		return {
			global: true,
			module: FingerprintModule,
		}
	}

	configure(consumer: MiddlewareConsumer)
	{
		consumer.apply(cookieParser()).forRoutes('*')
		consumer
			.apply(fingerprintMiddleware(FingerprintModule.configs))
			.forRoutes('*')
	}
}
