import { Schema, Document } from 'mongoose';
const mongoose = require('mongoose');

//---------- INTERFACE ----------

export interface IReserve extends Document {
    id_user: string;
    start_date: Date;
    end_date: Date;
    id_car: string;
    final_value: number;
}

// ---------- SCHEMA ----------

const reservesSchema: Schema = new Schema(
    {
        id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        start_date: {
            type: Date,
            required: true,
            validate: {
                validator: function (this: IReserve, value: Date): boolean {
                    return value < this.end_date;
                },
                message: 'Start date must be before end date.',
            },
        },
        end_date: { type: Date, required: true },
        id_car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
            required: true,
        },
        final_value: { type: Number, required: true },
    },
    { versionKey: false }
);

export default reservesSchema;
