import {SENTRY_MODULE_OPTIONS} from "../constant/SENTRY_MODULE_OPTIONS.js"
import {makeInjectableDecorator} from "../../stripe/decorators/make-injectable-decorator.js";



/**
 * Injects the Sentry Module config
 */
export const InjectSentryModuleConfig = makeInjectableDecorator(SENTRY_MODULE_OPTIONS);