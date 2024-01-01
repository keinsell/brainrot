import {SENTRY_TOKEN} from "../constant/SENTRY_TOKEN.js"
import {makeInjectableDecorator} from "../../stripe/decorators/make-injectable-decorator.js";



export const InjectSentry = makeInjectableDecorator(SENTRY_TOKEN);