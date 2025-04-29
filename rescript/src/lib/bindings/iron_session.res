type cookieOptions = {
  domain: option<string>,
  expires: option<Js.Date.t>,
  httpOnly: option<bool>,
  maxAge: option<int>,
  path: option<string>,
  priority: option<string>, // "low", "medium", "high"
  sameSite: option<string>, // "lax", "strict", "none"
  secure: option<bool>,
}

type sessionOptions = {
  cookieName: string,
  password: Js.Dict.t<string>, // e.g., Js.Dict.fromArray([("1", "secret")])
  ttl: option<int>, // Time to live in seconds; None for no expiration
  cookieOptions: option<cookieOptions>,
}

type cookieStore = {
  get: string => option<{"name": string, "value": string}>,
  set: (string, string, option<cookieOptions>) => unit,
}

// Session type - generic to allow different session data structures
type t<'a> = {
  get: unit => promise<'a>,
  set: 'a => promise<unit>,
  save: unit => promise<unit>,
  destroy: unit => promise<unit>,
}

// External bindings to iron-session functions
@module("iron-session")
external getIronSession: (Js.Dict.t<'a>, Js.Dict.t<'b>, sessionOptions) => promise<t<'c>> =
  "getIronSession"

// Helper function for Next.js App Router
@module("iron-session")
external getIronSessionFromCookies: (cookieStore, sessionOptions) => promise<t<'a>> =
  "getIronSessionFromCookies"

// Helper function for Next.js API Routes
@module("iron-session")
external getIronSessionFromRequest: (Next.Request.t, sessionOptions) => promise<t<'a>> =
  "getIronSessionFromRequest"
