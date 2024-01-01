# Controllers

A dolph controller is any class that extends the `DolphControllerHandler` class. Each method that is written in this class is meant to be routed to an endpoint, which means that if you have business logic that isn't returning a response and receiving a request then it's best to place it in a [service class](/services/).

The basic structure of a controller class is given below:

::: code user.controller.ts

```ts
import { DolphControllerHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  SuccessResponse,
  TryCatchAsyncDec,
  DRequest,
  DResponse,
} from "@dolphjs/dolph/common";

export class UserController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  public async greetUser(req: DRequest, res: DResponse) {
    SuccessResponse({ res, body: { message: "Hi there user!" } });
  }
}
```

:::

It's advisable to wrap all controller methods in a **Try-Catch** block if executing logic that involves promises which would most often times be the case.
But dolph offers easier ways to achiver this:

1. Use of decorator
2. Function call

## Use of decorator

As you can see in the sample code above, a `TryCatchAsyncDec` decorator is being used on the **greetUser** method. This decorator wraps the code in the method in a try-catch block and handles error's seeminglessly. To learn more see [here](/decorators/).

## Function call

This method is acheived by calling the `TryCatchAsyncFn` function for the method in use.

```ts
public newUserO = TryCatchAsyncFn(async(req:DRequest, res: DResponse)=>{
    // business logic
})
```
