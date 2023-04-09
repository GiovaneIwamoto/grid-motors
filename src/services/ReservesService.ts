import { CreateReserveDTO } from '../DTO';
import { ReserveRepository, UserRepository } from '../repositories';
import { CarRepository } from '../repositories';
import { isValidObjectId } from 'mongoose';
import { IReserve } from '../models/Reserves';
import { getUserIdFromToken } from '../middlewares/AuthMiddleware';
import jwt from 'jsonwebtoken';

export default class ReservesService {
    _reserveRepository: ReserveRepository;
    _carRepository: CarRepository;
    _userRepository: UserRepository;

    constructor() {
        this._reserveRepository = new ReserveRepository();
        this._carRepository = new CarRepository();
        this._userRepository = new UserRepository();
    }

    //---------- POST RESERVE ----------

    async CreateReserve(createReserveDTO: CreateReserveDTO, token: string) {
        const car = await this._carRepository.find(createReserveDTO.id_car);

        // Find if car is registered
        if (!car) {
            throw new Error(
                `Car with ID: ${createReserveDTO.id_car} not found.`
            );
        }

        // Date and Final Value calculation
        const startDate = new Date(createReserveDTO.start_date);
        const endDate = new Date(createReserveDTO.end_date);

        const days = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        const final_value = car!.value_per_day * days;

        // Get User ID from Token
        const id_user = getUserIdFromToken(token);

        // Get User Qualification from token
        const obj_user = await this._userRepository.findById(id_user);
        const qualified_user = obj_user?.qualified;

        if (qualified_user !== 'yes') {
            throw new Error('User is not qualified to create a reservation');
        }

        // Not more than one reservation of the same car in the same day
        const existingCarReserve =
            await this._reserveRepository.findByCarAndDate(
                createReserveDTO.id_car,
                createReserveDTO.start_date,
                createReserveDTO.end_date
            );
        if (existingCarReserve) {
            throw new Error(
                `Unavailable Car: ${createReserveDTO.id_car} is already reserved for the requested period`
            );
        }

        // No more than one reservation is allowed in the same period by the same user  (USER CANNOT HIRE A FERRARI AND CIVIC FOR THE SAME DAY)
        const existingUserReserve =
            await this._reserveRepository.findByUserAndDate(
                id_user,
                createReserveDTO.start_date,
                createReserveDTO.end_date
            );
        if (existingUserReserve) {
            throw new Error(
                `User: ${id_user} already have a reserved car for the requested period`
            );
        }

        const reserve = {
            id_user,
            start_date: createReserveDTO.start_date,
            end_date: createReserveDTO.end_date,
            id_car: createReserveDTO.id_car,
            final_value,
        };

        const result = await this._reserveRepository.create(
            reserve as IReserve
        );
        return result;
    }

    //---------- GET ALL RESERVES ----------

    async GetAllReserves(queryParams?: any) {
        return await this._reserveRepository.findAll(queryParams);
    }

    //---------- DELETE RESERVE BY ID ----------

    async DeleteReserveById(id: string) {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid ID format: ${id}`);
        }
        const result = await this._reserveRepository.delete(id);

        if (!result) {
            throw new Error(`Reserve with ID ${id} not found`);
        }
        return result;
    }

    //---------- UPDATE RESERVE BY ID ----------

    async UpdateReserveById(
        id: string,
        updateReserveDTO: CreateReserveDTO
    ): Promise<IReserve> {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid ID format: ${id}`);
        }

        const updatedReserve = await this._reserveRepository.update(
            id,
            updateReserveDTO
        );

        if (!updatedReserve) {
            throw new Error(`Reserve with ID ${id} not found`);
        }

        return updatedReserve;
    }

    //---------- GET RESERVE BY ID ----------

    async GetReserveById(id: string) {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid ID format: ${id}`);
        }

        const result = await this._reserveRepository.find(id);

        if (!result) {
            throw new Error(`Reserve with ID ${id} not found`);
        }

        return result;
    }
}
