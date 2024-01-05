# Getting Started

Get started with the CLI application for full support or download the package into your codebase and build from scratch.

## Overview

This framework is a typescript and javascript backend framework built to ease development and shorten code while retaining simplicity.

It is built on the express.js framework and offers a wide range of classes, methods, functions and utility tools, from error handling middlewares to the best utiity loggers, to mention but a few.

## Prerequisites

- Node.js - **v18.0.0** or higher
- Text editor or IDE - We recomend [Visual Studio Code](https://code.visualstudio.com)
- Package manager - npm or yarn or pnpm. We recommend [yarn](https://yarnpkg.com/)

## Installation

You'll need a terminal for this process or you can use the interated terminal provide by Visual studio code if you are using that.

1. Install the CLI application first by running this command:

::: code-group

```sh [yarn]
yarn global add @dolphjs/cli
```

```sh [pnpm]
pnpm add -g @dolphjs/cli
```

```sh [npm]
npm i @dolphjs/cli --global
```

:::

2. Create project folder with setup:

```sh
dolph new <project-name>
```

3. Navigate into your project folder and install packages using your package manager:

::: code-group

```sh [yarn]
yarn
```

```sh [pnpm]
pnpm add
```

```sh [npm]
npm install
```

:::

## Usage

In order to have code files in your project, use the CLI to generate a complete MVC:

```sh
dolph g -a <name>
```

This generates a service, controller and model folder/file along side the index.ts file. These are generated in adherance to the dolphjs style guide.

You now have a sample dolphjs application set and all you need to do is start the server (even in watch mode):

::: code-group

```sh [start]
dolph start
```

```sh [watch]
dolph watch
```

:::

## Compatibility

Dolph is compatible with any package that can be used in an express application. This means that you can still use the same packages you use with express to build dolph applications.

::: details this only true for packages that are compatible with node engine v18.0 and above
