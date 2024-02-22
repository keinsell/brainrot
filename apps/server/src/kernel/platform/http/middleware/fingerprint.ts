import {
	createParamDecorator,
	DynamicModule,
	ExecutionContext,
	Injectable,
	MiddlewareConsumer,
	mixin,
	NestMiddleware,
	NestModule,
	Type,
}                   from '@nestjs/common';
import cookieParser from 'cookie-parser';
import {
	NextFunction,
	Request,
	Response,
}                   from 'express';
import murmurhash   from 'murmurhash3js';
import requestIp    from 'request-ip';
import ua           from 'useragent';

function getUserAgentFromRequest(req: Request): ua.Agent {
	return ua.parse(req.headers['user-agent']);
}

/**
 * Generate a fingerprint for the given request and parameters.
 *
 * @param {Request} req - The request object.
 * @return {object} - An object containing the generated fingerprint.
 */
export function generateFingerprint(
	req: Request,
): string {
	const ua = getUserAgentFromRequest(req);

	// Create a new fingerprint object
	const fingerprint: any = {
		headers: {
			accept: req.headers["accept"],
			language: req.headers["accept-language"],
			encoding: req.headers["accept-encoding"],
		},
		userAgent: {
			browser: {
				family: ua.family,
				version: ua.major,
			},
			device: {
				family: ua.device.family,
				version: ua.device.major,
			},
			os: {
				family: ua.os.family,
				major: ua.os.major,
				minor: ua.os.minor,
			},
		},
		ipAddress: req.ip,
	};

	req.headers["x-fingerprint"] = fingerprint;

	// Generate a unique hash for the fingerprint
	return murmurhash.x86.hash128(JSON.stringify(fingerprint));
}
