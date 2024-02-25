import {
	Injectable,
	Logger,
	NestMiddleware,
}                       from '@nestjs/common'
import {
	NextFunction,
	Request,
	Response,
}                       from 'express'
import murmurhash       from 'murmurhash3js'
import ua               from 'useragent'
import {ExpressRequest} from '../../../../types/express-response.js'



function getUserAgentFromRequest(req: Request): ua.Agent
{
	return ua.parse(req.headers['user-agent'])
}

/**
 * Generate a fingerprint for the given request and parameters.
 *
 * @param {Request} req - The request object.
 * @return {object} - An object containing the generated fingerprint.
 */
export function generateFingerprint(req: Request): string
{
	const ua = getUserAgentFromRequest(req)

	// Create a new fingerprint object
	const fingerprint: any = {
		headers  : {
			accept  : req.headers['accept'],
			language: req.headers['accept-language'],
			encoding: req.headers['accept-encoding'],
		},
		userAgent: {
			browser: {
				family : ua.family,
				version: ua.major,
			},
			device : {
				family : ua.device.family,
				version: ua.device.major,
			},
			os     : {
				family: ua.os.family,
				major : ua.os.major,
				minor : ua.os.minor,
			},
		},
		ipAddress: req.ip,
	}

	req.headers['x-fingerprint'] = fingerprint

	// Generate a unique hash for the fingerprint
	return murmurhash.x86.hash128(JSON.stringify(fingerprint))
}


/**
 * A middleware to generate a fingerprint for each request.
 */
@Injectable()
export class FingerprintMiddleware
	implements NestMiddleware
{
	private readonly logger = new Logger('middleware:fingerprint')

	use(req: ExpressRequest, res: Response, next: NextFunction): void
	{
		// Generate a fingerprint for the request
		const fingerprint = generateFingerprint(req)

		// Add the fingerprint to the request object
		req.headers['x-fingerprint'] = fingerprint
		req.fingerprint              = fingerprint

		this.logger.debug(`Generated fingerprint for request: ${fingerprint}`)

		// Pass the request
		next()
	}
}
