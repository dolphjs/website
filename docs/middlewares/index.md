# Middlewares

A middleware is a function which gets executed before the controller. This functions can access the **DRequest**, **DResponse** objects and the **next** function. The following description from the official express documentation describes the functions of a middleware:

Middleware functions can perform the following tasks:

- execute any code.
- make changes to the request and the response objects.
- end the request-response cycle.
- call the next middleware function in the stack.
- if the current middleware function does not end the request-response cycle, it must call next() to pass - - control to the next middleware function. Otherwise, the request will be left hanging.
