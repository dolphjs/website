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
dolph --help
```

```sh [short]
dc --help
```

:::

::: info
The **dc** command is the short form of **dolph cli**
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

Run `dolph <command>` --help for any of the following commands to see command-specific options.

See usage for detailed descriptions for each command.

| Command  |  Alias   | Description                                                                 |
| -------- | :------: | :-------------------------------------------------------------------------- |
| new      |    nw    | Scaffolds a new dolph project with neccesary configurations.                |
| generate |    g     | Generates files/folders and link them if neccessary based on the schematic. |
| watch    | **none** | Starts the application in watch (dev) mode                                  |
| start    |   none   | Starts the application (production)                                         |
| config   |    cf    | Modifies the contents of the dolph_cli.yaml file                            |

## Usage

### dolph new

Scaffolds a new dolph project with neccessary configurations.

::: code-group

```sh [normal]
dolph new <name>
```

```sh [short]
dc nw <name>
```

:::

**Description**

Creates and initializes a new Dolph project with configurations.

- Creates a directory with the given `<name>`.
- If a `.` was passed in place of _name_ then the project is created in that directory.
- Adds configuration files to the project directory

### dolph generate

Generates files/folders and link them if neccessary based on the schematic

::: code-group

```sh [normal]
dolph generate <schematic> <name>
```

```sh [short]
dc g <schematic> <name>
```

:::

**Arguments**

| Argument      | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `<schematic>` | The shcmeatic is an argument to specify the type of file/folder to create. |
| `<name>`      | Th name of this schematic to be created.                                   |

**Schematics**

| Name       | Alias | Description                                                                                                                 |
| ---------- | :---: | :-------------------------------------------------------------------------------------------------------------------------- |
| service    |   s   | Generates a dolph service file.                                                                                             |
| controller |   c   | Generates a dolph controller file.                                                                                          |
| routes     |   r   | Generates a dolph routes file.                                                                                              |
| models     |   m   | Generates a dolph models file.                                                                                              |
| all        |   a   | Generates all schematics for the name field provided, it is recommended to use immediately after running the `new` command. |

### dolph build

Compiles code in the `src` directory into the `app` directory, from typescript to javascript.

```sh
dolph build
```

### dolph start

Compiles and runs a dolph application in production mode.

```sh
dolph start
```

### dolph watch

Compiles and runs a dolph application in watch / dev mode.

```sh
dolph watch
```

### dolph config

Updates the values of the presets in the `dolph_cli.yaml` file.

::: code-group

```sh [normal]
dolph config <argument> <value>
```

```sh [short]
dc cf <argument> <value>
```

:::

**Arguments**

| Name | Description                                                                                 |
| ---- | :------------------------------------------------------------------------------------------ |
| -lg  | Updates the language field. Recognized values are: "ts" and "js".                           |
| -pd  | Updates the paradigm field. Recognized values are: "oop" and "functional".                  |
| -db  | Updates the database field. Recognized values are: "mongo", "postgresql", "mysql", "other". |
