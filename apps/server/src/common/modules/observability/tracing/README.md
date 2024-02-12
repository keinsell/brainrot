# `Tracer`

Tracer is an abstraction over tracing functionalities provided by OpenTelemetry-compatible libraries. It provides a
simple interface to start and stop spans, and to add attributes and events to spans. In some cases after simple
modifications it's possible to change tracing in the whole application.

Additionally it provides a set of decorators for tracing imporation functions, methods and classes. Ex. `@Trace()`,
`@TraceMethod()`, `@TraceClass()`. These decorators are used to automatically start and stop spans for the decorated
code.