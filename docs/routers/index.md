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

All special classes in **dolph.js** have to call the super class in their constructor. Routers also call the **initRoutes()** method which
