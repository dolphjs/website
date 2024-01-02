# Middlewares

A middleware is a function which gets executed before the controller. This functions can access the **DRequest**, **DResponse** objects and the **next** function. The following description from the official express documentation describes the functions of a middleware:

Middleware functions can perform the following tasks:

- execute any code.
- make changes to the request and the response objects.
- end the request-response cycle.
- call the next middleware function in the stack.
- if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

A middleware can be constructed just at is done in express but dolph offers three ways to do this:

- **DolphAsyncMiddleware**: this is a function that takes a single argument **fn**. This function is a generic function that takes three parameters: **req**, **res**, and **next**, representing a request, response, and a callback function, respectively. The **fn** function itself returns a Promise of type **DolphMiddleware**. The outer function returns another function that takes the same three parameters: **req**, **res**, and **next**.
  Here is sample codes on how to use this:

::: code sample.middlewares.ts

```ts
const sampleMiddleware = DolphAsyncMiddleware(
  async (req: DRequest, res: DResponse, next: DNextFunc) => {
    try {
      // do something
      next();
    } catch (e) {
      next(e);
    }
  }
);
```

:::

- **DolphMiddleware**: this function is a higher-order function that wraps around another function **(fn)**. It returns a new function that takes request, response, and next parameters, it is basically the synchronous version of the previous function.
  Here is sample codes on how to use this:

::: code sample.middlewares.ts

```ts
const sampleMiddleware = DolphMiddleware(
  (req: DRequest, res: DResponse, next: DNextFunc) => {
    // do something
    next();
  }
);
```

:::

- **DolphAsyncMiddlewareDec**: this function is a decorator that takes a function **(fn)** as an argument, which is expected to be an asynchronous function returning a **Promise** of type **void**. The decorator then returns a new function that wraps the original function, adding asynchronous middleware behavior. This means that unlike the previous methods whereby you insert the middleware into the endpoint [registration](/routers/), you actually use this as a controller method decorator.
  Here is sample codes on how to use this:

::: code sample.middlewares.ts

```ts
const sampleMiddlewareFn = async (
  req: DRequest,
  res: DResponse,
  next: DNextFunc
) => {
  // do something
  try {
    next();
  } catch (e) {
    next(e);
  }
};
```

:::

Usage in controller class:

::: code user.controllers.ts

```ts
@DolphAsyncMiddleware(sampleMiddlewareFn)
@TryCatchAsyncDec
public async sendGreeting(req: DRequest, res: DResponse) {
    SuccessResponse({
        res,
        body: { message: "user endpoint has been reached" },
    });
}
```

:::

There are pre-defined middlewares provided by dolph like the `JwtAuthMiddleware` but would be discussed in dedicated pages.
