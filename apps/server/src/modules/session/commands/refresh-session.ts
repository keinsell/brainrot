import {ApiProperty} from "@nestjs/swagger"
import jwt           from "jsonwebtoken"

//@ApiModel({
//	name:        "RefreshSession",
//	//description: "Payload user for refreshing existing session (Refresh Token)",
//})
export class RefreshSession {
	@ApiProperty({
		name:        "refreshToken",
		description: "...",
		example:     jwt.sign({ payload: {} }, 'secret'),
		examples:    [
			jwt.sign({ payload: {} }, 'secret'),
			jwt.sign({ payload: {} }, 'secret'),
			jwt.sign({ payload: {} }, 'secret')
		],
	}) refreshToken: string;
}