---
description: >-
  Alice is a sophisticated development environment focused on bringing
  real-world value into Large Language Models (LLMs) in software engineering
  based on the latest research papers.
cover: >-
  https://images.unsplash.com/photo-1588097257570-59b6f7360bfb?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHw4fHxnbGFzcyUyMHBpbmslMjBmbG93ZXJzJTIwM2R8ZW58MHx8fHwxNzI3OTQ3MzY4fDA&ixlib=rb-4.0.3&q=85
coverY: 0
layout:
  cover:
    visible: true
    size: full
  title:
    visible: false
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Introduction

## Introduction

Alice is a developer tool designed to leverage Large Language Models (LLMs) for tasks like code generation, testing, and documentation. By automating routine coding tasks, Alice aims to increase developer productivity and efficiency. While still under development, the project's goal is to provide a practical and user-friendly LLM-powered tool for software engineers.

{% hint style="warning" %}
Project is in a risky state and most likely will never be executed as there [much bigger corporations that are working on literally same or similar solution](https://sourcegraph.com/blog/the-self-driving-ide-is-coming) and in my opinion there is no need to flood GitHub with another "breaking" solution which is a same damn this repackaged into different packaging. However, I would like to keep this repository public with all of my research in case it would be actually helpful to someone.
{% endhint %}

### Why release another tool?

The proliferation of LLM-powered tools can be overwhelming. Alice differentiates itself by:

* **Local-first approach:** Operating offline without requiring cloud-based services or APIs.
* **Simplicity:** A straightforward user interface without complex configurations.
* **Pragmatism:** Prioritizing practical functionality over theoretical capabilities.

> "I'm so fucking tired of bastards who make software and brand it as open-source just to promote their shitty AI startup without any value, even through 100L code they make open-source it actually requires sometimes connection to 3-4 different cloud providers which is FUCKING INSANE. I have decided to pull out my own tool which will work on hardware you own and without network connection - as it fucking should. When I say that I also mean all of Ollama and Container-based tooling too, this shit is for the cloud and the fact we're suddenly using it to host local AI is just ridiculous. Suck my llama." \~ [Jakub Olan](https://app.gitbook.com/u/kk1WdUXXhxM63MgUsZbodinKLOa2 "mention")

### Overview of functionalities

* :scroll:[  **Quest-based change management**](concepts/quest/), user of tool is supposed to write little specification with later with chain of agents is extended in a complete modification plan of workspace, changes from "quests" are applied asynchronously in shadow realm. Once changes were successfully implemented and functionality of application was verified they can be merged back into original repository (source of truth).&#x20;
* :brain:  [**Automatic context management**](concepts/affinity.md), tool is offering different modes of context management where the default one is fully automatic: the tool will automatically try to fetch as much information as it can possibly fit into context to provide an accurate answer to a user question or task.

### What to expect?

* You can expect from this project it will work out-of-the-box just after installation on customer-grade hardware (incl. RTX 4090 as a cap of definition) without any additional configuration or external software required (speaking of Containers and Ollama).
* You can expect minimal usability for at least simple tasks, if experiment for such software will simplify fail it will be not shipped and repository will be archived - and we all can say LLMs suck and there is no way around it - learn vim a go to code.
* You cannot expect open-source models to match performance of OpenAI, Anthtropic and others while using customer-grade hardware, cloud-hosted solutions are 10x or even 100x of what you can possibly ever have - yet they are too expensive for being used by average customer - I was not satisfied with bill from OpenAI relatively to results that I have received and since I own hardware open-models are providing way better ROI even through they output is lesser quality.
* Quest Management
  * Create Quest
  * Update Quest
  * Delete Quest
  * Start Quest
  * Stop Quest
  * Track Quest
*
* Quest Management
  * Create Quest
  * Update Quest
  * Delete Quest
  * Start Quest
  * Stop Quest
  * Track Quest



### Frequent Questions and Answers (FAQ)

#### "I like the idea, are there alternatives to this project?"

> Everything today is just copy of a copy anyway... \~ [Jakub Olan](https://app.gitbook.com/u/kk1WdUXXhxM63MgUsZbodinKLOa2 "mention")

* [plandex](https://plandex.ai/), is one of few tools that I can recommend - I think it's kinda anti-user-experience and a bit over-packed with features, lacking offline model support but that's the only tool that somewhat give productive results in terms of time contributed into configuration and so on.
* [aider-chat](https://aider.chat/), I was using it for a while but it's fundamentally useless once you are using local model or cheaper cloud model, it simplifies just works with gpt4o and Claude which obviously ends up with billings equal to >10 USD for building simple HTML page (with a little exaggeration but that's a fact).

#### "Why you name things as MMORPG instead ML-related naming?"

Answer cloud not be simpler, everybody literally raped terms related to machine learning and language models to this point where I rather call things by items from World of Warcraft than unite with you all :kissing:. I was motherfucking grinding then, and I will do the same here to make this shit work (gimme that loot).

#### "But... How do I install cargo?"

Fuck off.
