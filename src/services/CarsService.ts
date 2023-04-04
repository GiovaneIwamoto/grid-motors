import { CreateCarsDTO } from '../DTO';
import { CarRepository } from '../repositories';
import { ICar } from '../models/Cars';

export default class CarsService {
    _carRepository: CarRepository;

    constructor() {
        this._carRepository = new CarRepository();
    }

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
}
