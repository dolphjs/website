# Authorization

Authorization is a crucial aspect of backend development that governs access to resources and actions within a software system. It ensures that users or entities have the appropriate permissions to perform specific operations, safeguarding sensitive data and maintaining the integrity of the application.

This documentation provides an overview of authorization concepts, strategies, and best practices in the context of backend and software development.

The terms **Auhorization** and **Authentication** seems to often get mixed up but ecen though they are different topics, authorization requires an authentication layer to work.

## Basic Authorization

This is the most basic form of authorization offered by dolph whereby you write your authorization logic and inject it as a paramter to the **JWTAuthorizeDec** decorator to process it for you,

### JWTAuthorizeDec

The JWTAuthorizeDec is very similar to the [JwtAuthVerifyDec]("/decorators/"), only difference being that it actually accepts a function parameter and calls it after perform authentication by passing the **paylod** object to the function which handles the authorization process.

```ts
  @TryCatchAsyncDec
  @JWTAuthorizeDec('random_secret', authFunc)
  public async createUser(req: DRequest, res: DResponse) {
    const { body, file } = req;
    SuccessResponse({ res, body: { payload: req.payload } });
  }
```

where the `authFunc` could be a simple function which queries the database using the **userId** from the payload object and checks if the user type is **admin**. If it matches the criteria, it should return true else it returns false. If it returns false, a 403 error is thrown else the **DnextFunc** is called and it proceeds to the controller.

```ts

const authFunc(payload: IPayload){
    const user = UserModel.findOne({_id: payload.sub});

    if(user && user.role === "admin"){
        return true;
    }

    return false;
}
```

The above function is just a very simple way for handling authorization using this decorator.
