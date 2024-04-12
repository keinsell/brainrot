# Autopilot

## Introduction

This is a simplified implementation for server autopilot -
an server that's able to manage itself and automate maintained tasks such as running migrations, backups, and more.

## Features

- `Automatic Migration`, once non-destructive migrations are added into stack server is able to manage them itself, and prepare a database once it'll connect to one.
- `Automatic Backup`, once backup is configured, server will be able to manage backups itself.
- `Automatic Restore`, once backup is configured, server will be able to manage restores itself.