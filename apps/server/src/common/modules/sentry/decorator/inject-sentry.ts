import {makeInjectableDecorator} from "../../integrations/stripe/decorators/make-injectable-decorator.js"
import {SENTRY_TOKEN}            from "../constant/SENTRY_TOKEN.js"



export const InjectSentry = makeInjectableDecorator(SENTRY_TOKEN);