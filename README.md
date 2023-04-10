# Grid Motors

#### **INTRODUCTION**

Welcome to Grid Motors API that allows admins to perform various operations related to Cars, Users and Events management. The API includes CRUD routes for all of those classes previously quote. Please refer to the following routes for more details:

#### **INSTALLATION GUIDE**

-   Clone this repository [planner-api](https://github.com/GiovaneIwamoto/grid-motors.git)

-   Ensure that you are working from the main branch, it is the most stable at any given time for this project.

-   Run `npm install` to install all the dependencies needs.

-   Run `npm run start` to start the local server hosted at http://localhost:3000 and the connection to the data base.

-   To connect the application to the database, please create a self `config.env` file at the root of your project, if it does not already exist. In this file, set the values of two environment variables: `DATABASE` and `DATABASE_PASSWORD`. These variables should contain the database connection string and the database password, respectively. Once you have set these variables, the application will be able to access the database using the provided credentials. My own development cluster is available at the config.env file at this project, but it is recommended to create your own data base.

-   Make sure that you have all that dependencies in your package.json file correctly installed

#### **FEATURES**

-   `CAR REGISTER` Allows authenticated users to register a car being necessary to have at least one accessory. The car fabrication year must be between 1950 and 2023. It is not able to register duplicates accessories at the same object.

-   `CAR GET ALL` Any user can search for all registered cars at the data base and can be filtered by searching by query params passing any car attribute.

-   `CAR REMOVE` Only authenticated users can delete a registered car. Can be deleted by passing it's car's id.

-   `CAR UPDATE PUT` It is used to replace an existing resource with a new one, so it is needed to send the entire resource representation in the request body. Knowing this logic, some fields can be updated but not all can be deleted or updated too. The car's id is protected to be updated and deleted for preventing data manipulations. This method can be used to delete accessories sending de PUT method without the accessory that is wanted to be deleted.

-   `CAR GET BY ID` Using this method is able to get one single car, if exists, by passing its id.

-   `USER REGISTER` At user post method there are some importants validations to be considered. CPF at the request body is validated by a third-party library called cpf-cnpj-validator that checks if the string passed is valid according to the cpf validation logic and internally the API checks at the database if it is unique. CEP attribute is sended to an external API called VIA CEP that returns some infos about the location. User's age is calculated internally and validates if user is at least eighteen years old. Email must be unique in base and must have a valid format. Password length is validated by mongo and must be at least six digits.

-   `USER AUTHENTICATION` Users can get a valid token making a post request with a valid email and password. The system checks its credentials and return a temporary token that expires in twelve hours

#### **SWAGGER**

We have implemented Swagger to provide a more user-friendly interface for testing our API. You can access the Swagger UI by visiting `http://localhost:3000/api/v1/api-docs` in your browser. From there, you can see a list of all available API routes and see all necessaries params and request and response bodies examples. Some interaction with swagger isn't already implemented.

#### **TECHNOLOGIES USED**

The following technologies were used in the development of this project:

`Node.js`: A JavaScript runtime built on Chrome's V8 JavaScript engine that allows for server-side scripting.

`Express`: A fast and minimalist web framework for Node.js used to create server applications.

`Mongoose`: An Object Data Modeling (ODM) library used for MongoDB to provide a schema-based solution to model application data.

`MongoDB`: A document-oriented NoSQL database used for storing and retrieving data.

`JSON Web Tokens`: A compact and self-contained way for securely transmitting information between parties as a JSON object.

`Swagger`: An open-source software framework used for designing, building, documenting, and consuming RESTful web services.

`Dotenv`: A zero-dependency module used for loading environment variables from a .env file into process.env.

`TypeScript`: A statically-typed superset of JavaScript that compiles to plain JavaScript.

All functionalities of the routes and the authentication system are documented in Swagger, which can be accessed at the specif route defined above after starting the local server with npm run start. The project also includes development dependencies such as `nodemon` for automatic server restarts and `ts-node` for running TypeScript files without compilation.

#### **CONCLUSION**

Thank you for testing our app.
This project provides a simple and straightforward way for managing reserves, cars and users accounts. Whether you're creating a new reserve or logging into your account, the project has got you covered.

#### **AUTHORS**

-   Giovane Hashinokuti Iwamoto - Computer Science student at UFMS - Brazil - MS

I am always open to receiving constructive criticism and suggestions for improvement in my developed code. I believe that feedback is an essential part of the learning and growth process, and I am eager to learn from others and make my code the best it can be. Whether it's a minor tweak or a major overhaul, I am willing to consider all suggestions and implement the changes that will benefit my code and its users.

I would like to thank Compass UOL for the amazing experience of challenges and learning opportunities during my internship. It has been an incredible journey, and I am grateful for the knowledge and skills I have gained while working with such a talented and supportive team.
