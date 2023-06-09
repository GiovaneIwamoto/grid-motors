import { CreateReserveDTO, UpdateReserveDTO } from '../DTO';
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

    async update(
        id_reserve: string,
        updatedReserveDTO: UpdateReserveDTO
    ): Promise<IReserve | null> {
        const updatedReserve = await this.ReserveModel.findByIdAndUpdate(
            id_reserve,
            updatedReserveDTO,
            { new: true }
        );
        return updatedReserve;
    }

    //---------- GET RESERVE BY ID ----------

    async find(id: string) {
        return this.ReserveModel.findById(id);
    }

    //---------- FIND BY CAR AND DATE ----------

    async findByCarAndDate(carId: string, startDate: Date, endDate: Date) {
        const reservations = await this.ReserveModel.find({
            id_car: carId,
            start_date: { $lte: endDate },
            end_date: { $gte: startDate },
        });
        if (reservations.length > 0) {
            return reservations;
        }
    }

    //---------- FIND BY USER AND DATE ----------

    async findByUserAndDate(id_user: string, startDate: Date, endDate: Date) {
        const reservations = await this.ReserveModel.find({
            id_user: id_user,
            start_date: { $lte: endDate },
            end_date: { $gte: startDate },
        });
        if (reservations.length > 0) {
            return reservations;
        }
    }
}
