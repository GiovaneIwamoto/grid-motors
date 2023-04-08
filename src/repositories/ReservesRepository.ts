import { CreateReserveDTO } from '../DTO';
import { IReserve, default as reservesSchema } from '../models/Reserves';
import mongoose, { Model } from 'mongoose';

export default class ReserveRepository {
    private readonly ReserveModel: Model<IReserve>;

    constructor() {
        this.ReserveModel = mongoose.model<IReserve>('Reserve', reservesSchema);
    }

    //---------- POST RESERVE ----------

    async create(reserve: IReserve) {
        const newReserve = new this.ReserveModel(reserve);
        console.log(newReserve);
        return newReserve.save();
    }

    //---------- GET ALL RESERVES ----------

    async findAll(queryParams?: any) {
        return this.ReserveModel.find(queryParams);
    }
}
