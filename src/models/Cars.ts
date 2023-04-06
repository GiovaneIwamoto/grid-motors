import { Schema, Document } from 'mongoose';

//---------- INTERFACE ----------
export interface ICar extends Document {
    carModel: string;
    color: string;
    year: string;
    value_per_day: number;
    accessories: { description: string }[];
    number_of_passengers: number;
}

// ---------- SCHEMA ----------
const carsSchema: Schema = new Schema(
    {
        carModel: { type: String, required: true },
        color: { type: String, required: true },
        year: {
            type: Number,
            required: true,
            validate: {
                validator: function (value: number) {
                    return value >= 1950 && value <= 2023;
                },
                message: 'Fabrication year must be between 1950 and 2023',
            },
        },
        value_per_day: { type: Number, required: true },
        accessories: {
            type: [{ description: { type: String, required: true } }],
            required: [true, 'Accessories are required.'],
            validate: {
                validator: function (accessories: any[]) {
                    return (
                        accessories.length > 0 &&
                        new Set(accessories.map((acs) => acs.description))
                            .size === accessories.length
                    );
                },
                message: 'At least one unique accessory is required.',
            },
        },
        number_of_passengers: { type: Number, required: true },
    },
    { versionKey: false }
);

export default carsSchema;
