# Usage

{% hint style="warning" %}
Project is a concept, this usage selection presents potential future interface to interact with application rather than actual state of application. Once application will be released there will be visual distinguish of commands that are implemented and these what are not.
{% endhint %}

### Quickstart

TODO: Initialization of project, setting up a quest and running a quest with managing it's results.

```sh
> alie init

🚀 Alice jumped onboard your workspace!

> alie quest new --title="Simple fucking website" --details="I need a clone of infamous motherfucking website project"

# TODO: Nushell-like table with quest information

> alie quest start angry-pikachu --no-review

# Quests by default will start in asynchronous mode in background
# You can change this behaviour by adding --await argument into command

> alie quest cd angry-pikachu # Enter shadow realm

> alie quest review # pager with differences made

> alie quest approve/reject
```

### Quest Management

* Creating Quests
* Listing Quests
* Deleting Quests
* Rejecting Quests
* Approving Quests
* Tracking Quests

### Interactive Dashboard

* Active throughput and resource consumption
* Estimated time to complete quests

