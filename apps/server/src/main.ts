import {bootstrap}                                      from "./bootstrap.js"
import {experimentalOpenTelemetryTracker}               from "./common/infrastructure/observability/telemetry/agents/otel-experiemental-agent/otel-experimental-agent.js"
import {env}                                            from "./configs/env.js";
import {prettyPrintServiceInformation, printSystemInfo} from "./utilities/console-utils/index.js"



if (env.TRACING || true) {
	experimentalOpenTelemetryTracker()
}

if (env.isProduction) {
	printSystemInfo()
}

prettyPrintServiceInformation()

await bootstrap();

// I have a example product of customer

const profile = {
	"id":        "1",
	"firstName": "John",
	"lastName":  "Doe",
	"email":     "keinsell@protonmail.com",
	"address":   {
		"street": "1234 Main St",
		"city":   "San Francisco",
		"state":  "CA",
		"zip":    "94123",
	},
}

const product = {
	"id":          "1",
	"name":        "Product 1",
	"description": "This is a product",
	"price":       100,
	"quantity":    100,
}

const cart = {
	"id":          "1",
	"customerId":  "1",
	"products":    [product],
	"totalAmount": 100,
}

const payment = {
	"id":         "1",
	"customerId": "1",
	"amount":     100,
	"status":     "success",
}

// Once user is created there should be a profile created for the user
// Once profile is created or updated there should be integration service which could potentially use Event to update the profile in other services (Stripe, etc)