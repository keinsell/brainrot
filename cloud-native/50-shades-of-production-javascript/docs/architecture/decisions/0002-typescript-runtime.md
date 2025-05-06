## 2. TypeScript Runtime

**Date:** 2023-10-13

### Status

Pending

### Context

Our application is built using TypeScript, which is a statically typed superset of JavaScript. To run this TypeScript
code, we need to compile it into JavaScript. We are also using Nest.js, a popular framework for building Node.js
applications. Nest.js relies on two TypeScript compiler options: `emitDecoratorMetadata` and `experimentalDecorators`.
However, the availability of these options varies among different TypeScript compilers.

Another important consideration is our dependency on `CommonJS` modules, which are a module system used in Node.js. Some
TypeScript compilers may not fully support `CommonJS` modules, especially when we want to release our application using
the `ESNext` module system.

To address these concerns, we need to explore different TypeScript runtime options. There is existing research on this
topic available at the [ts-runtime-comparison](https://github.com/privatenumber/ts-runtime-comparison) repository, which
can provide insights into potential solutions. However, it's essential to thoroughly test and configure each runtime to
determine if it works with our current project configuration and to understand any trade-offs we might need to accept.

### Problem Statement

The problem at hand is twofold:

1. **Compatibility with TypeScript Compilers:** We need to ensure that our TypeScript code, which relies on specific
   compiler options (`emitDecoratorMetadata` and `experimentalDecorators`), can run on various TypeScript compilers.
   Some compilers may not support these options, causing potential compatibility issues.

2. **CommonJS Dependency and ESNext Release:** Our project depends on `CommonJS` modules, and we want to consider the
   possibility of releasing our application using the `ESNext` module system. This transition may pose challenges if
   certain TypeScript compilers do not fully support `CommonJS` modules when targeting `ESNext`.

### Decision

The proposed solution or action to address the identified problem.

### Consequences

The expected outcomes and impacts of implementing the decision, including any risks that need to be managed.
