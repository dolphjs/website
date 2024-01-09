# Routers

Routers are one of the special classes in dolph.js. A basic router in dolphjs has a syntax which resmebles the code below. A router is used to route endpoints to the controller meant to handle such request. It extends the **DolphRouteHandler** class.

::: code user.routes.ts

```ts
import { UserController } from "@/controllers/user/user.controller";
import { DolphRouteHandler } from "@dolphjs/dolph/classes";
import { Dolph } from "@dolphjs/dolph/common";

export class UserRouter extends DolphRouteHandler<Dolph> {
  constructor() {
    super();
    this.initRoutes();
  }

  public readonly path: string = "/users";
  controller = new UserController();

  initRoutes(): void {
    this.router.get(`${this.path}`, this.controller.getUsers);
    this.router.post(`${this.path}/register`, this.controller.register);
  }
}
```

:::

The code above asumes you have a `user.controller.ts` file in the controller directory which implements the methods: **getUsers** and **register**

::: info
to create a router using the CLI, simply execute the $ dolph g -r [name]
:::

All special classes in **dolph.js** have to call the super class in their constructor. Routers also call the **initRoutes()** method which is where all endpoints are routed to the appropriate controller.

The **path** property is used to specify the parent routing path. Assuming we have a class router with path `"/user"`, this means that all the endpoints under that router would be appended to the path, such that this is a valid endpoint:

```ts
this.router.put(`${this.path}/update`, ...);
```

The **controller** property is of type `DolphControllerHandler` which expects an instantiated controller.

::: tip
to avoid clouding the server.ts file with routers, it is advisable to export all router classes into an array which is then exported and used in the server.ts file as shown below:
:::

::: code index.ts

```ts
// in your routes directory

import { UserRouter } from "./user/user.routes";
import { PostRouter } from "./post/post.routes";
import { CommentRouter } from "./comment/comment.routes";

export const routers = [
  new UserRouter(),
  new PostRouter(),
  new CommentRouter(),
];
```

:::

::: code server.ts

```ts
import { DolphFactory } from "@dolphjs/dolph";
import { routers } from "./routes";

const dolph = new DolphFactory(routers, []);
dolph.start();
```

:::

::: details it is advisable to maintain a controller for each router class.
