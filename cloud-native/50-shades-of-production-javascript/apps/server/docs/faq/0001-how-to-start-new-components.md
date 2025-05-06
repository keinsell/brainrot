# How to start new components?

This document serves as a comprehensive guide to understanding the layered structure of components in software
development. Each layer represents distinct levels of intricacy and structural organization in software projects.

## Basic Components: Layer 1 (L1)

Layer 1 components form the bedrock of software projects. These components are typically simple and focused, primarily
handling user interface elements and direct user interactions.

### Characteristics

- Presentation Layer Focus: These components are solely concerned with the presentation layer, which means they deal
  with everything the user sees and interacts with directly. This includes user interface elements like buttons, text
  fields, and layouts.
- Procedural Approach: Layer 1 components often use a procedural programming paradigm. They are built using sequences of
  instructions to process input (like user clicks or text input) and generate output (such as displaying data or
  triggering an event).
- Standalone Nature: Designed to function independently, these components do not rely on or interact with other software
  layers or components. This isolation simplifies their design but limits their functionality to basic tasks.
- Lack of Integration Capabilities: Layer 1 components typically do not possess built-in capabilities to integrate with
  more complex systems or databases. They are primarily geared towards straightforward tasks.

### Structure

- `controller-file`
- `module-file`

## Enhanced Components: Layer 2 (L2)

Layer 2 components in software development represent an escalation in complexity from basic Layer 1 components. They
introduce a Service class, which acts as an intermediary between the Presentation layer and any data processing or
business logic. This layer marks the beginning of a more structured approach to software design, allowing for better
separation of concerns and maintainability.

### Characteristics

- **Dual-Layer Integration**: L2 components integrate the Presentation layer with the Service layer. The Presentation
  layer
  is responsible for user interface and user experience aspects, while the Service layer handles business logic and data
  processing. This separation enhances code organization and readability.
- **Partial Shareability**: The Service class in L2 components is designed to be shareable across different parts of the
  application. However, this sharing should be approached cautiously, as excessive interdependencies can lead to complex
  code and maintenance challenges.
- **No Persistence Layer**: L2 components do not include a Persistence layer, which means they cannot store data
  internally. This is a significant limitation, as it prevents the component from performing complex tasks like
  interacting with databases or other external systems. However, it do not deny usage of ORM inside service layer,
  however such usage of ORM is considered as risky as we have no control over persistence models.

### Structure

- `controller-file`
- `service-file`
- `module-file`

## MVC Components: Layer 3 (L3)

Layer 3 components merge complexity with ease-of-use, reminiscent of the Model-View-Controller (MVC) architecture. They
encompass:

- A combination of `Presentation`, `Service`, and `Persistence` layers.
- Improved shareability via the `Service` class, though it's not the most recommended approach.

### Structure

- `controller-file`
- `service-file`
- `model-file`
- `module-file`

## MVVM Components: Layer 4 (L4)

MVVM (Model-View-ViewModel)

### Structure

- `presentation`
    - `controllers`
    - `view-models`
    - `dtos`
- `application`
    - `services`
    - `shared-kernel`
- `persistance`
    - `repositories`
    - `models`
- `module-file`

## Self-Contained Components: Layer 5 (L5)

- Adds `Infrastructure` layer for portability.

## Business Components: Layer 6 (L6)

Layer 5 components represent the pinnacle of complexity, focusing on detailed business logic and typically adopting
a `Domain-Driven Design` framework. They include:

- An extensive array of layers covering `Presentation`, `Application`, `Service`, `Domain`, `Infrastructure`,
  and `Persistence`.

Each layer in this guide delineates a systematic approach to building software components, catering to a range of
complexity levels and organizational requirements.

Following Layer 5 in the "Software Component Development: A Layered Guide," you could introduce a new layer that focuses
on adaptive and predictive functionalities. This could be called:

After Layer 5 in your Software Component Development guide, a potential addition could be **"Strategic Components: Layer
6 (L6)"**. Here's a proposed structure for L6:

## Zenith Components: Layer 7 (L7)

Layer 6 components transcend traditional software boundaries, focusing on strategic integration and overarching
architectural design. They are characterized by:

- **Cross-System Integration:** Enabling seamless integration across different systems, platforms, and technologies.
  This layer emphasizes interoperability and system-to-system communication.
- **Architecture and Strategy:** Focusing on strategic architectural decisions that influence not just the application
  but the entire ecosystem of the organization's technology.
- **Advanced Business Logic:** Incorporating complex business rules and processes that are crucial for decision-making
  and strategic initiatives.
- **Predictive Analytics and AI:** Leveraging advanced technologies like Machine Learning, AI, and Predictive Analytics
  to enhance decision-making and provide predictive capabilities within the application.
- **Governance and Compliance:** Ensuring adherence to industry standards, regulatory requirements, and best practices
  in governance, security, and compliance.
- **Scalability and Performance Engineering:** Prioritizing high scalability and optimal performance, especially for
  applications that demand high throughput and low latency.

L6 represents the zenith of software component complexity, where the focus shifts from individual component design to a
holistic, strategic perspective that aligns with broader business goals and technological advancements. This layer is
crucial for enterprises aiming to maintain a competitive edge in a rapidly evolving digital landscape.