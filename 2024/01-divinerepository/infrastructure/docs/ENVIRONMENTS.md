# Infrastructure Environments

## Local Development

Local Development may require 3rd-party services to be running in cloud. There is a `docker-compose.yml` file in the
root of the repository that can be used to run these services locally.

## Release Channels

Release channels are essentially different versions of a software product that are made accessible to different target
demographics at different times during the development process.

They enable software developers to have different versions of their software available simultaneously while they
continue development, testing, and experimentation in different environments.

| Channel   | Description | Purpose                                                                                                                                                                                                              |
|-----------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dev`     | Development | This is where the latest features and updates are tested. Its stability can vary depending on recent changes. Mainly for developers who want to check or work on the latest updates.                                 |
| `nightly` | Nightly     | Code in the nightly channel is updated every night with recent changes, indicating that it will often be less stable. Intended for early adopters and testers who want to provide feedback.                          |
| `beta`    | Beta        | After sufficient testing, changes move from dev or nightly to the Beta channel. This is a pre-release version that is considered to be stable enough for general use while still potential having non-critical bugs. |
| `stable`  | Stable      | This is the official release that is considered most reliable and bug-free. Suitable for users who value stability and reliability over having latest changes.                                                       |

## Application/Organization Environments

The following lays out the various environments used within our application/organization development process. Each
environment has a distinct purpose, and they are organized progressively from the most unstable to the most stable.

- `local` - **Local Development Environment**: This is the developers' local environment where changes are initially
  made. It is typically set up on a developer's personal machine, replicating the production environment as close as
  possible.

- `development` - **Published Development Environment**: This is a shared and public environment where code is tested.
  It includes the latest changes developers have made but are not yet in the production environment.

- `preview` - **Staging Environment**: This environment is a mirror of the production environment, used as a last
  testing spot before changes go live in the production environment. It catches potential errors without risk to the
  actual production environment.

- `canary` - **Canary Environment** (Bleeding-edge): This environment reflects the very latest, untested version of the
  application. It is mainly used to identify and address issues early with a small set of users without impacting the
  whole user community.

- `production` - **Production Environment**: This is the live environment accessed by end users. It's the most stable
  environment and has stringent testing and quality assurance processes in place.

## ...

- `redis`
- `postgres`
- `minio`