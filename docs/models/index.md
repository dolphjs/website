# Models

If you have experience with [express](http://expressjs.com/), you already have an idea. Dolph tries to lay down a set of guidelines and structures to be followed inorder to enjoy : scalable and performant codes, and clean and readable codes. One of the ways these are achieved is by the recommendation of use of models for designing databases. Currently, the framework supports only two databases out of the box: **mongodb** and **MySQL**. Using dolph's out of the box utility database functions and tools for mongodb means you'll be making use of the [mongoose](https://mongoosejs.com/) ODM to perform database queries and [sequelize](https://sequelize.org/) ORM to perform MySQL database queries.

## MongoDB

Here is what a basic mongodb model looks like:

::: code user.model.ts

```ts
import { transformDoc } from "@dolphjs/dolph/packages";
import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(transformDoc);
export const UserModel = model<IUser>("users", UserSchema);
```

:::

However, it is advisable to place the interface in an `interface` directory under the `models` directory, i.e:

```r
├─ src
│   ├─ models
│        ├─ interfaces
│              ├─ user.interfaces.ts
│        ├─ user.models.ts
```

You might be wondering the function of the `transformDoc` plugin, to satisfy your curiousity read about it and more [here](/decorators).

## MySQL

Here is what a basic mongodb model looks like:

::: code user.model.ts

```ts
import { sequelizeInstance } from "@/configs/db.configs";
import { DataTypes } from "sequelize";

export const User = sequelizeInstance.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.String(200),
    allowNull: false,
  },
});
```

:::

When you use the CLI to generate a new model with mySQL being your choosen database, a **configs** directory with a **db.configs** is created with sequelize Initialization hence the import from `@/configs/db.configs`. Read about databases [here](/databases/).
