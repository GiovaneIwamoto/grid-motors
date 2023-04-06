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
}
