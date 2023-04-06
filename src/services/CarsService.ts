import { CreateCarsDTO } from '../DTO';
import { CarRepository } from '../repositories';
import { ICar } from '../models/Cars';
import { isValid } from 'zod';
import { isValidObjectId } from 'mongoose';

export default class CarsService {
    _carRepository: CarRepository;

    constructor() {
        this._carRepository = new CarRepository();
    }

    //---------- POST CAR ----------

    async CreateCar(createCarDTO: CreateCarsDTO) {
        try {
            const car = {
                carModel: createCarDTO.carModel,
                color: createCarDTO.color,
                year: createCarDTO.year,
                value_per_day: createCarDTO.value_per_day,
                accessories: createCarDTO.accessories,
                number_of_passengers: createCarDTO.number_of_passengers,
            };
            return await this._carRepository.create(car as ICar);
        } catch (error) {
            throw error;
        }
    }

    //---------- GET ALL CARS ----------

    async GetAllCars(queryParams?: any) {
        return await this._carRepository.findAll(queryParams);
    }

    //---------- DELETE CAR BY ID ----------

    async DeleteCarById(id: string) {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid ID format: ${id}`);
        }
        const result = await this._carRepository.delete(id);

        if (!result) {
            throw new Error(`Car with ID ${id} not found`);
        }
        return result;
    }

    //---------- UPDATE CAR BY ID ----------

    async UpdateCarById(
        id: string,
        updateCarDTO: CreateCarsDTO
    ): Promise<ICar> {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid ID format: ${id}`);
        }

        const updatedCar = await this._carRepository.update(id, updateCarDTO);

        if (!updatedCar) {
            throw new Error(`Car with ID ${id} not found`);
        }

        return updatedCar;
    }

    //---------- GET CAR BY ID ----------

    async GetCarById(id: string) {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid ID format: ${id}`);
        }

        const result = await this._carRepository.find(id);

        if (!result) {
            throw new Error(`Car with ID ${id} not found`);
        }

        return result;
    }
}
