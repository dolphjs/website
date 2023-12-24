# Configuration

After creating the project, installing dependencies and choosing project presets, you'll notice the `dolph-cli.yaml` file present in your project root. This file contains the presets you choosed when being prompted and it's advisable not to be edited.

Another file you'll notice is the `dolph_config.yaml` file also in your project root directory and now this is the file you are going to modify based on your needs.
As at the current version, the file accepts only these configuration fields:

- database
- middlewares
- port

1. The database field is only useful when you want to make use of dolphjs auto initialization for monogodb database. If you want to connect to your monogdb database by just passing the url and options then configure as below:

```yaml
database:
  mongo:
    url: mongodb://localhost/my-db
    options:
      useNewUrlParser: true
port: 3030
```

In the case where you want your database url to be secret (recommended) then you just have to replace the url with **sensitive** and this keyword would tell dolphjs to look for an environmetal variable `MONGO_URL` and parse it's value for the url.

_Note: the MONGO_URL variable should be specified in your '.env' file._

2. The middleware field currently accepts only one middleware which is `cors`. This is used if you want to enable cors which be default isn't enabled.

```yaml
middlewares:
    cors:
      activate: true
      origin: '*'
      methods:
        - GET
        - POST
        - PUT
        - DELETE
 port: 3030
```

As shown in the code snippet above, the activate field when set to true tells dolphjs to enable cors using the other options passed like origin and methods.

_Note: the cors field accepts all the options it accepts if it were to be configured with code._

## Database Configurations

As at the current version, dolphjs provides out of the box support for mongodb and mysql databases and one of these is automating connection to the database server.
Yes, we have acheived that for mongodb with the config file but in a situation where you don't want to use the config file for that then you do it this way:

1. For mongodb - modify the index.ts file which serves as the enry file so it looks like this:

```typescript
import { autoInitMongo } from "@dolphjs/dolph/packages";

const dolph = new DolphFactory(routes, middlewares);

autoInitMongo({ url: "mongodb://localhost:127017/dolphjs", options: {} });
dolph.start();
```

2 For Mysql - If you choosed mysql as you database when being prompted by the CLI then you should have a config directory with an db.config file in there.
