<center>
<h1>
🎠 Plygrnd 🎠
</h1>
</center>

Plygrnd is a little collection of shit that I wrote, it's not really meaningful for the community and serves no other
purpose than tracking my own progress over time with the oversight on things which actually struggling me, there may be
tons of code which I'll probably use as boilerplate for building things as nobody in this industry is building new
things - all shit that companies need is mostly things that I've written from 2-3 years ago.
I'm also starting struggling with burnout, so I hope my work will be helpful to some people.

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

Repository isn't meant to be the next "copy-paste" boilerplate,
it is meant to be a boilerplate that you can use to learn and
actually use a little of such code for your own purposes.
Also, this repository will/should appear somehow complicated
for new programmers;
however, I swear things aren't as much complicated as they could be once you will understand an internal
library, I recommend you to have at least basic knowledge about
the following topics:

- Essential knowledge about TypeScript
- Essential knowledge about Docker and Docker Compose
- Essential knowledge about Hexagonal Architecture
- **Understanding** of DDD (Domain-Driven Design) in terms what is what and how it works
- Understanding of CQRS (Command, Event, Query)
- Understanding of Event Sourcing
- Minimal knowledge of other programming languages (as repository aims to be language agnostic)

#### Windows Support

Nobody likes you, use a Unix-like system (WSL2, macOS, Linux) or go away.

### Installation

```bash
git clone https://github.com/keinsell/plygrnd.git
cd plygrnd
pnpm install
http://localhost:5005/
```

### Usage

> "If modern repositories can't be run just for a quick demo with less than 5 commands, they can be dropped stright out
> to trash, we have abstraction ffs."
> ~ @keinsell

```bash
# And by such statement throw this repo to trash (at least for now)
```

## Features

- **🔑 Identity and Access Management (IAM)**, repository is providing basic Identity and Access Management (IAM)
  features, such as user management, role management, permission management and audit logging. These features are
  written from scratch, however there will be also integration with 3rd-party services such as "Keycloak", "Auth0" or "
  Okta".
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

- **People are idiots**, not first and not last to say this sentence, but it's true - people are idiots, they do not
  understand things, they do not read documentation, they do not read error messages, they do not read logs, they do not
  read anything, they do not understand anything, they do not understand the problem, they do not understand the
  solution, they do not understand the code, they do not understand the architecture, they do not understand the
  business, they do not understand the requirements. People are idiots, and they will always be idiots, and you have to
  deal with it - honestly, I'm an idiot too, but I'm trying to be less idiotic every day. I'll cry about it more on my
  blog, stay tuned.
- **Software is hard**, software is hard, it's not easy, it's not simple, it's not straightforward, it's not` "just
  write the code", it's not "just deploy the code", it's not "just run the code".
  People who think otherwise are just ignorant fucks that do not understand what they are doing.

## Contributing

[This kingdom is mine and mine alone](https://www.youtube.com/shorts/OzUmOqzaeeE). I do not want to see any pull
requests, issues or any other form of
contribution. If you want to contribute to this repository, fork it and do whatever you want with it.

```
You do not.
```

Please note that this project is released with a [Contributor Code of Conduct](CODE-OF-CONDUCT.md). By participating in
this project, you agree to abide by its terms.

<br />
<center>
Made with ❤️ for building products and learning and 😡 to the industry overfilled with frameworkers by @keinsell
</center>
