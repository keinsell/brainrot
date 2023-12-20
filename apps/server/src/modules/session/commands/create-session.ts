import {SessionProperties} from "../entities/user-session.js"



export type CreateSession = Omit<SessionProperties, "id" | "startTime">