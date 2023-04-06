import { Schema, Document } from 'mongoose';
import { cpf } from 'cpf-cnpj-validator';
import moment from 'moment';
import Joi, { string } from 'joi';

//---------- INTERFACE ----------

export interface IUser extends Document {
    name: string;
    cpf: string;
    birth: string;
    email: string;
    password: string;
    cep: string;
    qualified: string;
    patio?: string;
    complement?: string;
    neighborhood?: string;
    locality?: string;
    uf?: string;
}

// ---------- SCHEMA ----------

const userSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        cpf: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value: string) => cpf.isValid(value),
                message: 'Invalid CPF format',
            },
        },
        birth: {
            type: String,
            required: true,
            validate: {
                validator: function (value: string) {
                    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                        return false;
                    }
                    const date = moment(value, 'MM/DD/YYYY');

                    if (!date.isValid()) {
                        return false;
                    }

                    const age = moment().diff(date, 'years');

                    return age >= 18;
                },
                message:
                    'User must be at least 18 years old and birth must be in MM/DD/YYYY format.',
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value: string) => {
                    const schema = Joi.string().email({
                        tlds: { allow: false },
                    });
                    const { error } = schema.validate(value);
                    return !error;
                },
                message: 'Invalid email format',
            },
        },
        password: { type: String, required: true },
        cep: { type: String, required: true },
        qualified: {
            type: String,
            required: true,
            enum: ['yes', 'no'],
        },
        patio: { type: String },
        complement: { type: String },
        neighborhood: { type: String },
        locality: { type: String },
        uf: { type: String },
    },
    { versionKey: false }
);

userSchema.path('password').validate((value: string) => {
    const schema = Joi.string().min(6);
    const { error } = schema.validate(value);
    return !error;
}, 'Password must have at least 6 digits.');

export default userSchema;
