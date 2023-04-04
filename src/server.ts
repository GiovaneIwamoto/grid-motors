const mongoose = require('mongoose');
const dotenv = require('dotenv');

import express from 'express'

import { Router, Request, Response} from 'express';
import { Connection } from 'mongoose';


dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//------------------ SERVER ----------------
app.listen(3000, () => console.log('Server Running on Port 3000... 🤖'))

//------------------ MONGO DB ----------------
const DB = (process.env.DATABASE as string).replace('<PASSWORD>', (process.env.DATABASE_PASSWORD as string))
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: false
}).then((con: Connection) => {
    console.log('DB Connection Successful! ☎️')
})







