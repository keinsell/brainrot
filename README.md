# ⚡ Methylphenidate ⚡

> Boilerplate that will save you few lines
> ~ @keinsell

Methylophenidate is caffeinated language-agnostic repository boilerplate for modern software applications built around open-source technologies (nothing feels that great as vendor-locked cloud-native). Featuring release management, CI/CD, Deployment, Infrastructure Management, Application Observability and bunch of other famous buzzwords minus the blockchain and AI (however it's on the roadmap)

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

Where they are also bare minimum to use repository, we do not require strict installation of them as there is `scripts/00_setup_repository.sh` script which have purpose to setup your environment, if you do not want to use a script install dependencies listed below.

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

#### Windows Support

Nobody likes you, use Unix-like system (WSL2, MacOS, Linux) or go away.

### Installation

```bash
git clone https://github.com/keinsell/methylphenidate.git
cd methylphenidate
pnpm install
```

### Usage

> "If modern repositories cannot be ran just for a quick demo with less than 5 commands they can be dropped stright out to trash, we have abstraction ffs."
> ~ @keinsell

```bash
# And by such statement throw this repo to trash (at least for now)
```

### Development

You do not.

## Features

- `[TODO]` **⚡🔋 High Fckin' Voltage Batteries Included**, boilerplate it is providing all the information needed and
  documentation to just plug-and-play all the features, starting from set upping databases in local environment and
  ending up at "good enough" Continuous Integration (CI) pipeline to start playing with your application.
- `[TODO]` **Language-agnostic**, even through this repository is written mostly in TypeScript there's no problem to use it with application written in other languages, if you find deployment logic, versioning and packaing somehow useful for your application you can still use `turborepo` and ex. `cargo` under it.
  deliver you a good enough security for most purposes.
