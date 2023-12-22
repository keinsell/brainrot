import {makeInjectableDecorator} from "../../integrations/stripe/decorators/make-injectable-decorator.js"
import {SENTRY_MODULE_OPTIONS}   from "../constant/SENTRY_MODULE_OPTIONS.js"



/**
 * Injects the Sentry Module config
 */
export const InjectSentryModuleConfig = makeInjectableDecorator(SENTRY_MODULE_OPTIONS);