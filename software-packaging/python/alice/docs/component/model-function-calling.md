---
description: >-
  Agents have been focused around “function calling” of large language models,
  which allows them to perform interaction with user's machine and codebase.
icon: hammer
---

# Model Function Calling

* Code Intelligence (CINT)
  * Most important player on the market is Sourcegraph and they probably had the same idea or approach to the problem, currently they tools like [`scip`](https://github.com/sourcegraph/scip) or `cody`.&#x20;
* [code-navigator-codenav.md](../concepts/associates/experimental-associates/code-navigator-codenav.md "mention")
* Semantic Code Search (SCS)
  * Code Indexing like Sourcegraph
  * Code embedding and retrieval
* Documentation Search
  * Project should incorporate vectored snapshots of programming libraries documentations in a similar way as Dash.app does, and provide most significant documentation to the prompt of user.
* Terminal Integration (PTY, Emulation, Reedline)
* Language Server Protocol (LSP) Integration
* [Debug Adapter Protocol (DAG)](https://microsoft.github.io/debug-adapter-protocol/) Integration.
  * Integration with environment-native debugger tools, which would provide agent way more detailed context for resolving ongoing issues with code than ones usually provided within' terminal. The problem we see with terminal is overfilling context with junk information, which eventually lead to decreased performance of the model.
* Version Control System (VCS) Integration
  * Integration with `git` and `jj` branching models to provide a reviewable process of adding changes into the project, associates would be able to commit their changes, annotate them and eventually merge or open new branches for a specific quest.



### Low-Level Model Function Calls

*

