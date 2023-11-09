import {Injectable} from "@nestjs/common"



@Injectable()
export class AuthenticationService {

	public async authenticate(username: string, password: string) {
	}

	public async refreshToken(refreshToken: string): Promise<string> {
		return "refreshToken"
	}
}