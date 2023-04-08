/*  
    contains classes responsible for handling the HTTP requests 
    received by the API. They receive the request data, perform 
    necessary validations, and call the corresponding methods in 
    the services.
*/

export { default as CarsController } from './CarsController';
export { default as UsersController } from './UsersController';
export { default as ReservesController } from './ReservesController';
