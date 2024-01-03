# Decorators

Decorators play a very powerful role in dolph when using typescript and OOP approach to build. Currently, the latest version comes with a few out of the box decorators because we want to get feedback before shipping extra functionalities and utilities.
These decorators would be discussed below:

## TryCatchAsyncDec

A method decorator designed for handling asynchronous functions by encapsulating them within a try-catch block.This decorator ensures that any errors thrown within the decorated asynchronous method are caught and passed to the next function, which is then handled by the error handling middlewares used by the dolph engine. It is a **top-level decorator** which means that it in a case where there are more than one decorators called on a method, it should be placed on top of the others as shown below:

```ts
@TryCatchAsyncDec
@JWTAuthVerifyDec('random_secret')
@MediaParser({ fieldname: 'upload', type: 'single', extensions: ['.png'] })
```

## JWTAuthVerifyDec

A method decorator designed for verifying JSON Web Tokens (JWT) in dolph applications. The decorator verifies the presence of a valid JWT in the request headers, If a valid token is found, it is decoded and the resulting payload is attached to the **req.payload** property for further use. If no valid token is present or if an error occurs during verification, an [ErrorException](/error-handling/) with a status of **UNAUTHORIZED** is passed to the next function which is further passed to dolph's error handling middlewares.

A sample code is given below to show it's usage:

```ts
 @JWTAuthVerifyDec('random_secret')
 public async createUser(req: DRequest, res: DResponse) {
   const { body, file } = req;
   if (body.height < 1.7) throw new BadRequestException('sorry, you are too short for   this program');
   SuccessResponse({ res, body: { body, payload: req.payload } });
 }
```

This decorator recognizes only two authorization headers:

- **authorization**: this header is used to pass JWT tokens that were created using a **secret** and the HMAC algorithm. You don't have to write functions to create these tokens yourself, see available functions that already implement this for you [here](/authentication/).

- **x-auth-token**: this header is used to pass JWT tokens that were created using a **private and public key** and the RSA algorithem. You don't habe to write functions to create these tokens yourself, see available functions that already implement this for you [here](/authentication/).

From the code above, the **req.payload** object contains decoded information about the current user with contents relative to what was encoded into the token.

## CookieAuthVerifyDec

A method decorator designed for verifying authentication cookies in dolph applications. The decorator checks for the presence of the xAuthToken cookie in the request, If the cookie is present, it is decoded using HMAC-based verification with the provided secret. The resulting payload is attached to the **req.payload** property for use by controllers, middlewares e.t.c. If the cookie is missing, invalid or an error occurs during verification, an [ErrorException](/error-handling/) with a status of **UNAUTHORIZED** is passed to the next function which is further passed to dolph's error handling middlewares.

A sample code is given below to show it's usage:

```ts
@CookieAuthVerifyDec('random_secret')
public async createUser(req: DRequest, res: DResponse) {
  const { body, file } = req;
  if (body.height < 1.7) throw new BadRequestException('sorry, you are too short for   this program');
  SuccessResponse({ res, body: { body, payload: req.payload } });
 }
```

To create such cookies, [see here](/authentication/).

## InjectMySQL

A class decorator function designed for injecting a MySQL model into a specified property.

**Usage**

```ts
@InjectMySQL("propertyName", UserModel)
class MyClass {
  // The 'propertyName' property is injected with the 'UserModel'
  propertyName: ModelStatic<Model<any, any>>;

  // Constructor or methods can now utilize the injected model
  constructor() {
    this.propertyName.find({
      /*...*/
    });
  }
}
```

**Description**

- **propertyName**: A string representing the name of the property where the MySQL model will be injected.
- **model**: The MySQL model to be injected.

- The decorator dynamically adds a property to the class with the specified name (propertyName).
- The added property is assigned the MySQL model (model) passed to the decorator.

Here is a more real life use case:

```ts
@InjectMySQL("userModel", UserMySQLModel)
class UserService extends DolphServiceHandler {
  // The 'userModel' property is injected with the 'UserMySQLModel'
  userModel: ModelStatic<Model<any, any>>;

  constructor() {
    super("userservice");
  }

  public findUser = () => {
    // Access the injected model within the class constructor or methods
    return this.userModel.find({
      /*...*/
    });
  };
}
```

## InjectMongo

A class decorator function designed for injecting a MongoDB model into a specified property.

**Usage**

```ts
@InjectMongo("propertyName", UserModel)
class MyClass {
  // The 'propertyName' property is injected with the 'UserModel'
  propertyName: Model<any>;

  // Constructor or methods can now utilize the injected model
  constructor() {
    this.propertyName.find({
      /*...*/
    });
  }
}
```

**Description**

- **propertyName**: A string representing the name of the property where the MongoDB model will be injected.
- **model**: The MongoDB model to be injected.
- The decorator dynamically adds a property to the class with the specified name (propertyName).
- The added property is assigned the MongoDB model (model) passed to the decorator.

Here is a more real life use case:

```ts
@InjectMongo("userModel", UserMongoModel)
class UserService extends DolphServiceHandler {
  // The 'userModel' property is injected with the 'UserMongoModel
  userModel: Model<any>;

  // Constructor or methods can now utilize the injected model
  constructor() {
    super("userservice");
  }

  public createUser = () => {
    // Access the injected model within the class constructor or methods
    this.userModel.create({
      /*...*/
    });
  };
}
```

## InjectServiceHandler

A class decorator function designed for injecting service handlers into a class based on specified service mappings.

**Usage**

```ts
@InjectServiceHandler([
  { serviceName: "userService", serviceHandler: UserServiceHandler },
  { serviceName: "loggerService", serviceHandler: LoggerServiceHandler },
])
class MyClass {
  // The 'userService' and 'loggerService' properties are injected with corresponding service handlers
  userService!: UserServiceHandler;
  loggerService!: LoggerServiceHandler;

  // Constructor or methods can now utilize the injected service handlers
  constructor() {
    this.userService.someMethod();
    this.loggerService.log("Some log message");
  }
}
```

**Description**

- **serviceMappings**: An array of `DolphServiceMapping` objects specifying the service name and its corresponding [service handler](/services/).

- The decorator iterates through the provided serviceMappings array.
- For each mapping, a property with the specified serviceName is dynamically added to the class.
- The added property is assigned an instance of the corresponding `serviceHandler`.

::: info
this is used for injecting service classes into either a [parent services class](/services/) or a controller class.
:::

## MediaParser

A method decorator function designed for parsing and handling media files in an dolph application.

**Usage**

```ts
@MediaParser({
  fieldname: 'mediaFile',
  type: 'single', // or 'array'
  extensions: ['.jpg', '.png'],
  limit: 5,
  storage: {
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  },
})
async uploadMedia(req: DRequest, res: DResponse, next: DNextFunc) {
  // Access the parsed media files through req.files
  const mediaFile: Express.Multer.File = req.file;
  // Your handling logic here
}
```

**parameters**

- **options**: An object containing configuration options for media file handling.
- **fieldname**: The name of the form field for the media file.
- **type**: The type of media file handling, either 'single' or 'array'.
- **extensions**: An array of allowed file extensions.
- **limit**: The maximum number of files allowed (applicable for 'array' type).
- **storage**: Configuration options for multer disk storage.

**Description**

- The decorator checks if the request's content type is 'multipart/form-data'.
- It configures multer upload middleware based on the provided options.
- The **singleUpload** and **arrayUpload** functions are utilized to create the specific upload middleware.
- The parsed media files are attached to the request (req.files) for further use.

::: details this decorator uses the [multer](https://github.com/expressjs/multer) package behind the scenes.
