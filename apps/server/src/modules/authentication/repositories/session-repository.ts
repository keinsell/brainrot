import {Repository} from "../../../common/libraries/storr/index.js"
import {Session}    from "../../session/entities/session.js"



export abstract class SessionRepository extends Repository<Session> {}