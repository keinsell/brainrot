import {Opaque}      from "type-fest";
import {UserSession} from "../entities/user-session.js";



export type SessionExpirationDate = Opaque<Date, UserSession>