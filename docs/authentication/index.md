# Authentication

Authentication is a **critical** component of backend development that verifies the identity of users or systems accessing a software application. It is the process of ensuring that entities are who they claim to be, providing a foundation for secure and controlled access to the application's resources. There are many approaches to handle authentication.

Dolph comes with **out of the box** utility functions for aiding authentication, it also uses JWT as default mechanism for authentication. Dolph has 100% compatibility with express hence you can implement authentication however you want to with any packages and strategies / approaches which can be used in express.

We'll work you through a basic authentication:

## Creating an Auth Module

A module refers to a collection of service, controller, model and routes files for an entity which in out case is **auth**.

```sh
dolph-cli generate -a auth
```

For the sake of this documentation, to keep things easy we would perform user related logic in the **AuthService** and model in **AuthModel** but in a real life scenario, a **UserService** and **UserModel** should be created.

::: info
We are making use of mongodb database with the mongoose ODM for this tutorial
:::

::: code models/auth/auth.models.ts

```ts
import { transformDoc } from "@dolphjs/dolph/packages";
import { compareWithBcryptHash } from "@dolphjs/dolph/utilities";
import { Schema, Document, model } from "mongoose";

// declare a user interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  doesPasswordMatch: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// this plugin removes the `__v` and replaces the `_id` with `id` field when returning documents
UserSchema.plugin(transformDoc);

// this method is added to the UserSchema and would be used to compare pure password with hashed password
UserSchema.methods.doesPasswordMatch = async function (
  password: string
): Promise<boolean> {
  const user = this as IUser;
  return compareWithBcryptHash({
    pureString: password,
    hashString: user.password,
  });
};

export const AuthModel = model<IUser>("users", UserSchema);
```

:::

Now, update the **AuthService** with the code below:

::: code services/auth/auth.services.ts

```ts
import { DolphServiceHandler } from "@dolphjs/dolph/classes";
import { Dolph } from "@dolphjs/dolph/common";
import { InjectMongo } from "@dolphjs/dolph/decorators";
import { IUser, AuthModel } from "@/models/user/user.model";

import { Model } from "mongoose";

interface INewUser {
  email: string;
  username: string;
  password: string;
}

@InjectMongo("authModel", AuthModel)
export class AuthService extends DolphServiceHandler<Dolph> {
  authModel!: Model<IUser>;

  constructor() {
    super("authService");
  }

  public readonly find = async (email: string, username: string) => {
    let query = {};

    if (email && username) {
      query = { $or: [{ email }, { username }] };
    }

    return this.authModel.find();
  };

  public readonly create = async (data: INewUser) => {
    return this.authModel.create(data);
  };

  public readonly findByEmail = async (email: string) => {
    return this.authModel.findOne({ email });
  };
}
```

:::

### implementing our sign-up and sign-in logic

We create two methods, each for a specific endpoint called **signUP** and **signIn** which do just what their name says. As you can see, we instantiate the `AuthService` class so we can interact with methods provided by the class which we wrote above. The **signUp** method does a basic signup whereby it checks if the email and username exists in the databases and if it does, an error with a **400** status code is sent to the client. Using the **hasWithBcrypt** function which is provided by dolph, it hashes the password and saves the user to the database.

The **signIn** function checks if the email exists for a user in the database and if not, an error is sent ot the client else, we proceed to comparing the hashed password and the pure password inputed and if it matches the auth flow continues and a token is created using the `generateJWTwithHMAC` function.

::: code controllers/auth/auth.controller.ts

```ts
import { DolphControllerHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  SuccessResponse,
  TryCatchAsyncDec,
  DRequest,
  DResponse,
  BadRequestException,
  InternalServerErrorException,
} from "@dolphjs/dolph/common";
import moment from "moment";
import { hashWithBcrypt, generateJWTwithHMAC } from "@dolphjs/dolph/utilities";
import { AuthService } from "@/services/auth/auth.service";

const authService = new AuthService();

export class AuthController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  public async signUp(req: DRequest, res: DResponse) {
    const { email, password, username } = req.body;

    const user = await authService.find(email, username);

    if (user.length)
      throw new BadRequestException("a user with this account already exists");

    const newUser = await authService.create({
      email,
      username,
      password: await hashWithBcrypt({ pureString: password, salt: 10 }),
    });

    if (!newUser)
      throw new InternalServerErrorException(
        "an error occurred while creating user's account"
      );

    SuccessResponse({
      res,
      status: 201,
      body: { data: newUser },
    });
  }

  @TryCatchAsyncDec
  public async signIn(req: DRequest, res: DResponse) {
    const { email, password } = req.body;

    const user = await authService.findByEmail(email);

    if (!user) throw new BadRequestException("incorrect login details");

    if (!user.doesPasswordMatch(password))
      throw new BadRequestException("password does not match");

    const token = generateJWTwithHMAC({
      payload: {
        exp: moment().add(10000, "seconds").unix(),
        iat: moment().unix(),
        sub: user.id,
      },
      secret: "random_secret",
    });

    SuccessResponse({
      res,
      status: 200,
      body: { data: { token, user } },
    });
  }
}
```

:::

### The Router

The router class uses the path `/auth` and registers the two controllers in the **initRoutes** method.

::: code routes/auth/auth.routes.ts

```ts
import { AuthController } from "@/controllers/auth/auth.controller";
import { DolphRouteHandler } from "@dolphjs/dolph/classes";
import { Dolph } from "@dolphjs/dolph/common";

export class AuthRouter extends DolphRouteHandler<Dolph> {
  constructor() {
    super();
    this.initRoutes();
  }

  public readonly path: string = "/auth";
  controller: AuthController = new AuthController();

  initRoutes(): void {
    this.router.get(`${this.path}/signup`, this.controller.signUp);
    this.router.post(`${this.path}/signin`, this.controller.signIn);
  }
}
```

:::

### Registering router class in the server

The server expects an array of routers and in our case we have just one so we pass it into the param.

::: code server.ts

```ts
import { DolphFactory } from "@dolphjs/dolph";
import { AuthRouter } from "./routes/auth/auth.routes.ts";

const dolph = new DolphFactory([new AuthRouter()], []);
dolph.start();
```

:::

We should now be able to signup and signin users but of course, we have to protect other endpoints so that users cannot just access any resource without being authenticated.

## Guarding Endpoints

In our case, we are making use of JWT tokens and we created them using the **HMAC** algorithm so we have to utilize a function that verifies out token based on this criterias. If we performed authentication by using cookies then we would use the `CookieAuthVerifyDec` for this but since we used JWT, we are making use of the `JWTAuthVerifyDec` decorator.

So we implement a new method so that we can guard it from unauthenticated users:

::: controllers/auth/auth.controllers.ts

```ts
export class AuthController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  public async signUp(req: DRequest, res: DResponse) {
    const { email, password, username } = req.body;

    const user = await authService.find(email, username);

    if (user.length)
      throw new BadRequestException("a user with this account already exists");

    const newUser = await authService.create({
      email,
      username,
      password: await hashWithBcrypt({ pureString: password, salt: 10 }),
    });

    if (!newUser)
      throw new InternalServerErrorException(
        "an error occurred while creating user's account"
      );

    SuccessResponse({
      res,
      status: 201,
      body: { data: newUser },
    });
  }

  @TryCatchAsyncDec
  public async signIn(req: DRequest, res: DResponse) {
    const { email, password } = req.body;

    const user = await authService.findByEmail(email);

    if (!user) throw new BadRequestException("incorrect login details");

    if (!user.doesPasswordMatch(password))
      throw new BadRequestException("password does not match");

    const token = generateJWTwithHMAC({
      payload: {
        exp: moment().add(10000, "seconds").unix(),
        iat: moment().unix(),
        sub: user.id,
      },
      secret: "random_secret",
    });

    SuccessResponse({
      res,
      status: 200,
      body: { data: { token, user } },
    });
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec("random_secret")
  public async getUsers(req: DRequest, res: DResponse) {
    const users = await authService.find(null, null);

    if (!users.length)
      throw new NotFoundException("there are no registered users");

    SuccessResponse({ res, body: { data: users } });
  }
}
```

:::

The **JWTAuthVerifyDec** expects an `authorization` header with the token as value in this scenerio.

### Registering the new enpoint in the router class

::: code routes/auth/auth.routes.ts

```ts
  initRoutes(): void {
        this.router.get(`${this.path}/signup`, this.controller.signUp);
        this.router.post(`${this.path}/signin`, this.controller.signIn);
        this.router.get(`${this.path}/users`, this.controller.getUsers);
    }
```

:::

When you make the request without the token header you receive an error and if you pass an invalid token, you receive an error too. You can only access the `getUsers` method after being authenticated.
