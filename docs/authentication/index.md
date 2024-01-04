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
    return this.authModel.find({ $or: [{ email }, { username }] });
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
