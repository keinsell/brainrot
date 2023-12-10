import {SessionProperties} from "./session.js"



export type CreateSession = Omit<SessionProperties, "id" | "startTime">