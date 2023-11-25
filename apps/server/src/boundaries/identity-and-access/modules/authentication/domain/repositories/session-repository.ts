import {Session}           from "@boundary/identity-and-access/modules/authentication/domain/entities/session.js"
import {GenericRepository} from "../../../../../../common/libraries/persistence/repository/repository.js"



export abstract class SessionRepository extends GenericRepository<Session> {}