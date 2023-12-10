import {Repository} from "../../../../common/libraries/storr/index.js"
import {Session}    from "../../../session/session.js"



export abstract class SessionRepository extends Repository<Session> {}