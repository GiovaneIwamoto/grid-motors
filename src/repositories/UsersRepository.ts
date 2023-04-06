import { CreateUserDTO } from '../DTO';
import { IUser, default as userSchema } from '../models/Users';
import mongoose, { Model } from 'mongoose';

export default class UserRepository {
    private readonly UserModel: Model<IUser>;

    constructor() {
        this.UserModel = mongoose.model<IUser>('User', userSchema);
    }

    //---------- POST USER ----------

    async create(user: any) {
        const newUser = new this.UserModel(user);
        await newUser.save();
        return newUser;
    }

    //---------- GET ALL USERS ----------

    async findAll(queryParams?: any) {
        return this.UserModel.find(queryParams);
    }

    //---------- DELETE USER BY ID ----------

    async delete(id: string) {
        const deletedUser = await this.UserModel.findByIdAndDelete(id);
        return deletedUser;
    }

    //---------- UPDATE USER BY ID ----------

    async update(id: string, data: CreateUserDTO): Promise<IUser | null> {
        return this.UserModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }
    // ---------- FIND USER BY ID ----------

    async findById(id: string) {
        return this.UserModel.findById(id);
    }
}
