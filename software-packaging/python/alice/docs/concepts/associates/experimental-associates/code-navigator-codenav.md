---
icon: compass
---

# Code Navigator (CodeNav)

> To implement this in pragmatic way there will be like damn fucking a lot of hustle, looking at `aider-chat` and their implementation of AST-based indexing to later query such index and provide it back into context. I would like avoid doing this same way, as while method used by aider works for top 1% of models it does not for vast majority of models.

* :bulb: Integration with tools like `CodeQL`, `ast-grep` and `rg` to allow dynamically fetch needed information into context window of given agent, such windows may be summarized with flow of time to save costs and sending unnecessary information to model.
* :bulb: Language model should get information about structure of the project, content of the files and dynamically fetch relationships between the files. Not everything should be made out with RAG-related approach as vector search works in a different manner than code and relationships in code, the thing RAG is actually useful is only converting natural language into code symbols.
* :bulb: [`srclib`](https://srclib.org/), potentially may improve understanding of code by better presentation of AST. There was [one post on blog that have pointed various tools for source code query](https://unzip.dev/0x00e-code-query-tools/)



{% file src="../../../.gitbook/assets/2406.12276v1.pdf" %}

