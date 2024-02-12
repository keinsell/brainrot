# Automatic Tracer

Automatic Tracer is a module that allows for deep observability on Nest.js components by usage of metadata scanning and
automatic instrumentation. It's a bit tricky part of observability stack, however, the more information is available,
the
better debugging experience is.

Package is developed within internal `tracer` package and `logger` package.

## Components

- `AutomaticTracerInjector`.
- `ModuleScanner`.

### Trace Injectors

Trace injectors are classes that are responsible for scanning and instrumenting Nest.js components.

- `ControllerTraceInjector` - a class that is responsible for scanning and instrumenting Nest.js controllers.
- `ServiceTraceInjector` - a class that is responsible for scanning and instrumenting Nest.js services (providers).
- `EventEmitterTraceInjector` - a class that is responsible for scanning and instrumenting Nest.js event emitters.
- `MiddlewareTraceInjector` - a class that is responsible for scanning and instrumenting Nest.js middlewares.
- `InterceptorTraceInjector` - a class that is responsible for scanning and instrumenting Nest.js interceptors.
- `PipeTraceInjector` - a class that is responsible for scanning and instrumenting Nest.js pipes.
- `GuardTraceInjector` - a class that is responsible for scanning and instrumenting Nest.js guards.
- `ResolverTraceInjector` - a class that is responsible for scanning and instrumenting Nest.js resolvers (GraphQL
  Integration).
- `SchedulerTraceInjector` - a class that is responsible for scanning and instrumenting Nest.js schedulers.

## Features

- Automatic scanning of Nest.js components with optional integrations beyond the core Nest.js components.
- Plug-and-play architecture that allows for easy integration with other observability modules with usage of `tracer`
  module.