import {Repository} from "../../../../common/libraries/storr/repository/repository.js"
import {Session}    from "../entities/session.js"



export abstract class SessionRepository extends Repository<Session> {}