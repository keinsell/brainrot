import {Repository}  from "../../../common/libraries/storage/index.js"
import {UserSession} from "../../session/entities/user-session.js"



export abstract class SessionRepository extends Repository<UserSession> {}