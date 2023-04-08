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

    //---------- DELETE RESERVE BY ID ----------

    async delete(id: string) {
        const deletedReserve = await this.ReserveModel.findByIdAndDelete(id);
        return deletedReserve;
    }

    //---------- UPDATE RESERVE BY ID ----------

    async update(id: string, data: CreateReserveDTO): Promise<IReserve | null> {
        return this.ReserveModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }
}
