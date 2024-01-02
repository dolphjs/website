# CLI

The CLI is one of the most important features of dolph because it plays very many vital roles, from initializing and creating a new dolph project to creating components and even runnning our server. It is a command line interface tool offered by dolph that aids in the initialization and development of dolph applications.

## Installation

The dolph CLI is available on npm and can be installed with any package manager of your choice though recommended by the dolph team for installation is **npm**. To do so, you'll have to install the package to your global repository which means you don't need to install the package for every single project which reduces the packages and app size.

Installing the CLI using global install (for linux users, you might want to use sudo to run this command):

::: code-group

```sh [npm]
npm i @dolphjs/cli --global
```

```sh [yarn]
yarn global add @dolphjs/cli
```

```sh [pnpm]
pnpm add -g @dolphjs/cli
```

:::

## Overview

Once installed, you can invoke CLI commands directly from your OS command line through the dolph executable. To see available commands, run either commands:

::: code-group

```sh [normal]
dolph-cli --help
```

```sh [short]
dc --help
```

:::

::: info
The **dc** command is the short form of **dolph-cli**
:::

To get help of an individual command, use the following construct. Substitute any command, like **new** , **start** e.t.c, where you see **generate** in the example below to get detailed help and info regarding the command.

```sh
dc generate --help
```

## Command Syntax

All dolph commands follow the same format:

```sh
dc commandOrAlias [optionalArg] [options]
```

Most commands, and some options, have aliases. Try running `dc new --help` to see options and aliases for the **new** command.

## Commands

Run `dolph-cli <command>` --help for any of the following commands to see command-specific options.

See usage for detailed descriptions for each command.
