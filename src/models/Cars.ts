import { Schema, Document } from 'mongoose';

export interface ICar extends Document {
    carModel: string;
    color: string;
    year: string;
    value_per_day: number;
    accessories: { description: string }[];
    number_of_passengers: number;
}

const carsSchema: Schema = new Schema({
    carModel: { type: String, required: true },
    color: { type: String, required: true },
    year: { type: String, required: true },
    value_per_day: { type: Number, required: true },
    accessories: [{ description: { type: String, required: true } }],
    number_of_passengers: { type: Number, required: true },
});

export default carsSchema;
