import {Repository}  from "../../../common/libraries/storr/index.js"
import {UserSession} from "../../session/entities/user-session.js"



export abstract class SessionRepository extends Repository<UserSession> {}