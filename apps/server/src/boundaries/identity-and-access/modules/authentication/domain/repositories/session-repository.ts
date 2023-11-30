import {Session}    from "@boundary/identity-and-access/modules/authentication/domain/entities/session.js"
import {Repository} from "../../../../../../common/libraries/storr/repository/repository.js"



export abstract class SessionRepository extends Repository<Session> {}