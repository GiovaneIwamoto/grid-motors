import { CreateReserveDTO } from '../DTO';
import { ReserveRepository } from '../repositories';
import { CarRepository } from '../repositories';
import { isValidObjectId } from 'mongoose';
import { IReserve } from '../models/Reserves';
import jwt from 'jsonwebtoken';
import { getUserIdFromToken } from '../middlewares/AuthMiddleware';

export default class ReservesService {
    _reserveRepository: ReserveRepository;
    _carRepository: CarRepository;

    constructor() {
        this._reserveRepository = new ReserveRepository();
        this._carRepository = new CarRepository();
    }

    //---------- POST RESERVE ----------

    async CreateReserve(createReserveDTO: CreateReserveDTO, token: string) {
        const car = await this._carRepository.find(createReserveDTO.id_car);

        if (!car) {
            throw new Error(
                `Car with ID: ${createReserveDTO.id_car} not found.`
            );
        }

        const startDate = new Date(createReserveDTO.start_date);
        const endDate = new Date(createReserveDTO.end_date);

        const days = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        const final_value = car!.value_per_day * days;

        const id_user = getUserIdFromToken(token);

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
