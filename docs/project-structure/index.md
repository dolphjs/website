# Project strcuture

This is basically the folder and file structure for a dolphjs project. After running the `dolph-cli new <project>` command, you must have noticed a generated project with the struture below:

```r
.
├─ src
├─ .gitignore
├─ .swrcr
├─ .dolph_config.yaml
├─ .dolph-cli.yaml
├─ package.json
├─ tsconfig.json
```

::: info
the folder structure assumes you choosed typescript as project language. However, structure for javascript isn't much different except for the absent of the .swrcr and tsconfig.json files
:::

The `src` folder is where your code lies. The other files in the root directory:

- .gitignore : where files and folders to be ignored by git when pushing your code are specified.
- .swrcr: it's used by dolphjs to set path config
- .dolph_config.yaml : this is the main file of a dolphjs project used to specify your configurations.
- .dolph-cli.yaml: this is the file created and managed automatically by the CLI and shouldn't be modified.
- package.json: your project's config file which holds improtant info about your project
- tsconfig.json: the typescript configuration file which can be edited to your needs.

After running the `dolph-cli g -a <name>` command to generate an endpoint and it's folders, your project sturcture looks like this:

```r
├─ src
│   ├─ controllers
│        ├─ user
│   ├─ models
│         ├─ user
│   ├─ routes
│         ├─ user
│         ├─ index.ts
│   ├─ services
│         ├─ user
│   ├─ server.ts
├─ .gitignore
├─ .swrcr
├─ .dolph_config.yaml
├─ .dolph-cli.yaml
├─ package.json
├─ tsconfig.json
```

Above is just a basic view of the project structure, however we would explain other folders and files below too:

- **server.ts** : this file is the entry file, it is where the code is initialized and where you'll do any initiallizations like where you'll attach your socket server e.t.c.

- **controllers** : this holds the business logic of your code. In an OOP environment, it has a single class which extends the [DolphControllerHandler](/controllers/). It is recommended for each controller (or group of) to have subfolders under the controller directory.

- **models**: this holds the database design / models of the application and it's advisable that for each collection/ table, a new subfolder is created which could contain not only the models but model types, schema, configs e.t.c.

- **routes**: this is the directory where route are kept. Each unique route has a subfolder with it's name. In an OOP environment, a file with a class which extends [DolphRouteHandler](/routes/). Also, there is an index.ts file present in the directory and it imports all the route classes into one array which is then exported and injected into the server.ts file.

- **services**: this is a very important directory which could hold a lot of files and subfolders depending on the size of the project. It holds business logic which could be used by several class-methods in a class controller and can also hold code for external services like third-party software. In an OOP environment, a service file is present in this directory extends the `DolphServiceHandler` class.
  In a large codebase where services would be used across several controllers, it is advisable to create an `index.ts` file with a service in which all the services are injected into and it's exported and used to access all sevices.

- **configs**: if you choosed to work with `mysql` when setting presets then you should see a configs directory alongisde the others. This directory is where you put your configurations, from third-party software configs to package softwares e.t.c.

- **middlewares**: this directory should be used when you want to create middlewares for your project.

- **helpers**: this are actually advised to be used as subfolders in other directories llike the : services, controllers and model directories. It should contain code which as the name implies, are helpers used in writing code in either of the mentioned directories.

- **utils**: the utils directory contains utility methods/ functions.

- **validations**: another subfolder which should be used under the three main directories. It is used to store code meant for validations like [Joi validations](https://github.com/hapijs/joi), e.t.c

- **dto**: used for storing dto's.

- **constants**: used for specifying constants. Also advisable to be made a subfolder based on it's content.

::: details the sample file structure assumes you choosed typescript, oop and mongo as presets and you ran the generate command with **user** as the name. `dolph-cli g -a user`
