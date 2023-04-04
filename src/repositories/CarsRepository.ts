import { ICar, default as carsSchema } from '../models/Cars';
import mongoose, { Model } from 'mongoose';

export default class CarRepository {
    private readonly CarModel: Model<ICar>;

    constructor() {
        this.CarModel = mongoose.model<ICar>('Car', carsSchema);
    }

    async create(car: ICar) {
        const newCar = new this.CarModel(car);
        return newCar.save();
    }
}
