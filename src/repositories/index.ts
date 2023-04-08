/*
    contains the classes responsible for handling read and write 
    operations in the database. They receive queries from the services 
    and perform the corresponding operations in the database.
*/

export { default as CarRepository } from './CarsRepository';
export { default as UserRepository } from './UsersRepository';
export { default as ReserveRepository } from './ReservesRepository';
