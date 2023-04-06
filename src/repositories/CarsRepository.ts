import { CreateCarsDTO } from '../DTO';
import { ICar, default as carsSchema } from '../models/Cars';
import mongoose, { Model } from 'mongoose';

export default class CarRepository {
    private readonly CarModel: Model<ICar>;

    constructor() {
        this.CarModel = mongoose.model<ICar>('Car', carsSchema);
    }

    //---------- POST CAR ----------

    async create(car: ICar) {
        const newCar = new this.CarModel(car);
        return newCar.save();
    }

    //---------- GET ALL CARS ----------

    async findAll(queryParams?: any) {
        return this.CarModel.find(queryParams);
    }

    //---------- DELETE CAR BY ID ----------

    async delete(id: string) {
        const deletedCar = await this.CarModel.findByIdAndDelete(id);
        return deletedCar;
    }

    //---------- UPDATE CAR BY ID ----------

    async update(id: string, data: CreateCarsDTO): Promise<ICar | null> {
        return this.CarModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    //---------- GET CAR BY ID ----------

    async find(id: string) {
        return this.CarModel.findById(id);
    }
}
