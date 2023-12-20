<center>
<h1>
⚡ Methylphenidate ⚡
</h1>
</center>

> Boilerplate that will save you few lines
> ~ @keinsell


Methylophenidate is caffeinated language-agnostic repository boilerplate for "modern software" (after month of building I would like to say this repository is more like organization bootstrap instead a single project) built around
open-source technologies (nothing feels that great as vendor-locked cloud-native). Featuring release management, CI/CD,
Deployment, Infrastructure Management, Application Observability and bunch of other famous buzzwords minus the
blockchain and AI (however, it's on the roadmap).



## Table of Contents

TODO

## Getting Started

### Prerequisites

Application requires few standard tools to be installed on your machine, you can find them below:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [`bash`]().

#### Additional Dependencies

Where they are also bare minimum to use repository, we do not require strict installation of them as there
is `scripts/00_setup_repository.sh` script which have purpose to setup your environment, if you do not want to use a
script install dependencies listed below.

- [pnpm](https://pnpm.js.org/)
- [pre-commit](https://pre-commit.com)

#### Recommended Knowledge

Repository isn't mean to be next "copy-paste" boilerplate, it is mean to be a boilerplate that you can use to learn and
actually use a little of such code for your own purposes. Also this repository will/should appearch somehow complicated
for new programmers however I swear things aren't as much complicated as they could be once you will understand internal
library, I recommend you to have at least basic knowledge about
following topics:

- Essential knowledge about TypeScript
- Essential knowledge about Docker and Docker Compose
- Essential knowledge about Hexagonal Architecture
- Understanding of model happening in DDD (Aggregate, Value Object)
- Understanding of CQRS (Command, Event, Query)
- Understanding of Event Sourcing
- Minimal knowledge of other programming languages (as repository aims to be language agnostic)

#### Windows Support

Nobody likes you, use Unix-like system (WSL2, MacOS, Linux) or go away.

### Installation

```bash
git clone https://github.com/keinsell/methylphenidate.git
cd methylphenidate
pnpm install
http://localhost:5005/
```

### Usage

> "If modern repositories cannot be ran just for a quick demo with less than 5 commands they can be dropped stright out
> to trash, we have abstraction ffs."
> ~ @keinsell

```bash
# And by such statement throw this repo to trash (at least for now)
```

## Features

- **🔑 Identity and Access Management (IAM)**, repository is providing basic Identity and Access Management (IAM)
  features, such as user management, role management, permission management and audit logging. These features are written from scratch, however there will be also integration with 3rd-party services such as "Keycloak", "Auth0" or "Okta".
- **E-Commerce**
- **Warehouse Management**
- **Order Management**
- **Customer Management**
- **Inventory Management**
- **Shipping Management**
- **Payment Management**
- **Analytics**
- **Reporting**
- **Dashboard**
- **User Management**
- **Role Management**
- **Permission Management**
- **Audit Logging**
- **Event Sourcing**

## Technological Approach

- **📦 Monorepository**, repository is structured as monorepository, it means that it contains multiple
  packages that are managed by single package manager, in this case it is `pnpm` which is a modern package manager for
  Node.js applications.
- **🔋 Batteries Included**, repository is providing all the information needed and documentation to just plug-and-play
  all the features, starting from set upping databases in local environment and ending up at "good enough" Continuous
  Integration (CI) pipeline to start playing with your application.
- **🔌 Language-agnostic**, even through this repository is written mostly in TypeScript there's no problem to use it
  with application written in other languages, if you find deployment logic, versioning and packaing somehow useful for
  your application you can still use `turborepo` and ex. `cargo` under it.

## Development

### Common Takes

- **Clean Code Principles**, every person who is taking clean code literally should leave the industry, Uncle Bob had good ideas however they aren't always right (like the world is...) - it's good to know and eventually if something looks good in your eyes go for it, take shrooms once per week and then read your code again - write down pitfalls and then fix them.
- **Unbreakability Theory**, every software is breakable - the thing is how much it can break, none of 3rd-party integrations should bring your whole application down, use limited trust for supply chain and integrations even between your own code. One trust between dots is limited and link is breakable, software will be able to recovery itself from such breakage.

## Contributing

[This kingdom is mine, and mine alone](https://www.youtube.com/shorts/OzUmOqzaeeE). I do not want to see any pull requests, issues or any other form of
contribution. If you want to contribute to this repository, fork it and do whatever you want with it.

```
You do not.
```


<br />
<center>
Made with ❤️ for building products and 😡 to the industry by @keinsell
</center>