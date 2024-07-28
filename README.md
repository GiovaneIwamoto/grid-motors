# GRID MOTORS

### **INTRODUCTION**

Welcome to Grid Motors API that allows admins to perform various operations related to Cars, Users and Events management. The API includes CRUD routes for all of those classes previously quote.

[![Icons](https://skillicons.dev/icons?i=ts,nodejs,mongodb,fastapi,jest,postman&theme=dark)](https://skillicons.dev)

---

### **FEATURES**

> [!IMPORTANT]
> All functionalities of the routes and the authentication system are documented in Swagger, which can be accessed at the specif route defined bellow after starting the local server with npm run start. The project also includes development dependencies such as nodemon for automatic server restarts.

> CARS OPERATIONS

`CAR REGISTER` Allows authenticated users to register a car being necessary to have at least one accessory. The car fabrication year must be between 1950 and 2023. It is not able to register duplicates accessories at the same object.

`CAR GET ALL` Any user can search for all registered cars at the data base and can be filtered by searching using query params passing any car attribute.

`CAR REMOVE` Only authenticated users can delete a registered car. Can be deleted by passing it's car's id.

`CAR UPDATE PUT` It is used to replace an existing resource with a new one, so it is needed to send the entire resource representation in the request body. Knowing this logic, some fields can be updated but not all can be deleted or updated too. The car's id is protected to be updated and deleted for preventing data manipulations. This method can be used to delete accessories sending de PUT method without the accessory that is wanted to be deleted.

`CAR GET BY ID` Using this method is able to get one single car, if exists, by passing its id.

---

> USERS OPERATIONS

`USER REGISTER` At user post method there are some importants validations to be considered. CPF at the request body is validated by a third-party library called cpf-cnpj-validator that checks if the string passed is valid according to the cpf validation logic and internally the API checks at the database if it is unique. CEP attribute is sended to an external API called VIA CEP that returns some infos about the location. User's age is calculated internally and validates if user is at least eighteen years old. Email must be unique in base and must have a valid format. Password length is validated by mongo and must be at least six digits.

`USER UPDATE` Admins can update existing users at the database by making a put request. All the restrictions from user registering are applied for this method. All extra CEP infos are handled from VIA CEP and automatically updated to base without the need to manually add.

`USER DELETE` It is also possible to delete an existing user passing its ID. Only authenticated users are able to use this method.

`USER AUTHENTICATION` Users can get a valid token making a post request with a valid email and password. The system checks its credentials and return a temporary token that expires in twelve hours.

`USER GET ALL AND BY ID` Like cars routes, all users can be listed using a get method or more specifically passing an ID at query to get an specific user. Filtering by params is also a availabe feature.

`ACCESSORY UPDATE PATCH` Authenticated users can edit accessorie's description making a patch request containing both car and accessory ID that want to update.

---

> RESERVATIONS OPERATIONS

`RESERVE REGISTER` Only authenticated users that have a driver's license are able to make a car reservation. The resquest body needs to contain a start and end date that is necessary for the calculation of the final value for reservation. It is also required a car's ID that refers to the rented car for that period of time. Differents car's models have differents prices, with that bussiness logic the API is responsible and able to calculate the final value according to the car model. Another interesting feature is that after conclude a reservation, the responsible user can no longer rent another car according to the registered booking date in his domain. The same rule applies when others users try to register a reservation that already has a car scheduled for a common date previously reserved.

`RESERVE GET ALL AND BY ID` Users that are logged into the system authentication can get a list of all the reservations or a specific reserve by passing a valid reserve's ID. Searching can be filtered passing params at query.

`RESERVE UPDATE PUT` Some bussiness logic at updating a reserve were implemented at this API. Using a valid and registered reserve's ID it is possible to change some infos. The user ID responsible for the reservation can only be changable if the new user ID has a driver's license. Reservation dates can only be changed if both the car is available and if the user do not have a reserve registered for the mentioned date.

`RESERVE DELETE` Authenticated users can remove a reserve using a valid and existing ID.

> [!TIP]
> Swagger was implemented to provide a more user-friendly interface for testing this API. You can access the Swagger UI by visiting http://localhost:3000/api/v1/api-docs in your browser. From there, you can see a list of all available API routes and see all request and response bodies examples. At this point, some interactions with swagger isn't already working as it should be, as a developer, I highly recommend testing and visualize the endpoints using the Postman Collection available at src folder if it is in your interest consuming the API features.

---

### **INSTALLATION GUIDE**

> [!CAUTION]
> Ensure that you are working from the main branch, it is the most stable at any given time for this project.

```python
Run "npm install" to install all the dependencies needs.
Run "npm run start" to start the local server hosted at "http://localhost:3000" and the connection to the data base.
Run "npm run test" to check tests coverages implemented using Jest.
```

> [!NOTE]
> To connect the application to the database, create a self `config.env` file at the root of your project, if it does not already exist. In this file, set the values of two environment variables: DATABASE and DATABASE_PASSWORD. These variables should contain the database connection string and the database password, respectively. Once you have set these variables, the application will be able to access the database using the provided credentials. My own development cluster is available at the config.env file at this project, but it is recommended to create your own data base.

---

### **TECHNOLOGIES USED**

```ruby
The following technologies were used in the development of this project:

Nodejs: A JavaScript runtime built on Chromes V8 JavaScript engine that allows for server-side scripting.
Express: A fast and minimalist web framework for Node.js used to create server applications.
Mongoose: An Object Data Modeling library used for MongoDB to provide a schema-based solution to model application data.
MongoDB: A document-oriented NoSQL database used for storing and retrieving data.
JSONWebTokens: A compact and selfcontained way for securely transmitting information between parties as a JSON object.
Swagger: An open-source software framework used for designing, building, documenting, and consuming RESTful web services.
Dotenv: A zero-dependency module used for loading environment variables from a .env file into process.env.
TypeScript: A statically-typed superset of JavaScript that compiles to plain JavaScript.
Jest: A popular JavaScript testing framework used for writing unit tests, integration tests, and endtoend tests.
```

---

### **UNIMPLEMENTED FEATURES**

One potential technology that was not applied in this project is pagination for the GET ALL methods. Pagination is a technique used to limit the amount of data returned from a query or API endpoint, typically for retrieving large datasets, and it can greatly improve the performance and efficiency of data retrieval operations.

By implementing pagination, the application could have provided a more scalable and optimized solution for fetching data, particularly in scenarios where there are a large number of records to be returned. Pagination allows for retrieving data in smaller, more manageable chunks, reducing the load on the server and improving response times. This can be particularly beneficial in cases where bandwidth or processing resources are limited, or when dealing with slow or unreliable network connections.

While pagination is not implemented in the current project, it could have been a valuable addition to optimize the performance and user experience of the application, especially when dealing with large datasets.

> [!WARNING]
> Jest unit testing coverage achieved only 40%, which is not very satisfactory. It is evident that there is ample room for improvement in terms of test coverage. Increasing the test coverage can greatly enhance the overall quality and reliability of the codebase, as it helps to identify and fix potential issues and regressions.

---

### **AUTHOR**

-   Giovane Hashinokuti Iwamoto - Computer Science student at UFMS - Brazil - MS

I am always open to receiving constructive criticism and suggestions for improvement in my developed code. I believe that feedback is an essential part of the learning and growth process, and I am eager to learn from others and make my code the best it can be. Whether it's a minor tweak or a major overhaul, I am willing to consider all suggestions and implement the changes that will benefit my code and its users.

I would like to thank Compass UOL for the amazing experience of challenges and learning opportunities during my internship. It has been an incredible journey, and I am grateful for the knowledge and skills I have gained while working with such a talented and supportive team.
