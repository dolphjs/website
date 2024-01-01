# Services

Services in dolph are meant to be an extension of business logic which could be shared between more than one controller method. A service is basically a class that extends the `DolphServiceHandler` class. In a large application for instance, a service class named `UserService` can actually hold these methods which relates to the user object:

- saveUser
- retrieveUser
- deleteUser

From the names, you can tell that they are responsible for communicating with the database directly and it is recommended for database related interactions should not be handled by the controller but services to obey the **Single Responsibility Principle**.

A basic example of a dolph service class looks like this:

```ts
import { INewUser } from "@/interfaces/users.interfaces";
import { IUser, UserModel } from "@/models/user/user.model";
import { DolphServiceHandler } from "@dolphjs/dolph/classes";
import { Dolph } from "@dolphjs/dolph/common";
import { InjectMongo } from "@dolphjs/dolph/decorators";
import { Model } from "mongoose";

@InjectMongo("userModel", UserModel)
export class UserService extends DolphServiceHandler<Dolph> {
  userModel!: Model<IUser>;

  constructor() {
    super("userservice");
  }

  public readonly create = async (data: INewUser) => {
    return this.userModel.create(data);
  };

  public readonly find = async (query: any) => {
    return this.userModel.find(query);
  };

  public readonly findByEmail = async (email: string) => {
    return this.userModel.findOne({ email });
  };
}
```

From the sample code above, you'll notice the decorator `InjectMongo` and this decorator is used for injecting a mongodb database model into the service class whcih makes it callable with the `this` keyword. Read more about it and others [here](/decorators/).
Another noticable feature of this class which is unique from other dolph classes is that the **super** class is called by passing the name of the service as a parameter.

::: info
the name of the service is the name the dolph engine is going to use to identify each dolph service classes
:::

Services aren't meant to be limited to database interactions but they can be used for other processes. They are basically just classes that implements methods which can be used across serveral controller methods.
