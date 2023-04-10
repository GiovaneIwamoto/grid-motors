const mongoose = require('mongoose');
const dotenv = require('dotenv');

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { Router, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { CarsRoute, ReservesRoute, UsersRoute } from './routes';

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//------------------ SWAGGER ----------------

const options = {
    swaggerOptions: {
        persistAuthorization: true,
        showRequestHeaders: false,
    },
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'GRID MOTORS',
            version: '1.0.0',
            description: 'GRID MOTORS API SWAGGER',
        },
        servers: [{ url: 'http://localhost:3000/api/v1/' }],
    },
    apis: ['./**/*.yaml'],
};
const specs = swaggerJsDoc(options);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//------------------ MONGO DB ----------------
const DB = (process.env.DATABASE as string).replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD as string
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: false,
    })
    .then((con: Connection) => {
        // console.log('DB CONNECTION SUCCESSFUL! ⚙️');
    });

//---------------- ROUTES ----------------
const baseRoute = '/api/v1';
app.use(baseRoute, CarsRoute);
app.use(baseRoute, UsersRoute);
app.use(baseRoute, ReservesRoute);

//------------------ SERVER ----------------
// app.listen(3000, () => console.log('SERVER RUNNING ON PORT 3000 ⚙️'));
app.listen(3000);
export { app };
