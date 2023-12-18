import {SessionProperties} from "../entities/session.js"



export type CreateSession = Omit<SessionProperties, "id" | "startTime">