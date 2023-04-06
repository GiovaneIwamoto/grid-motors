import { Request, Response } from 'express';
import { CreateCarsDTO } from '../DTO';
import { CarsService } from '../services';
import mongoose from 'mongoose';

export default class CarsController {
    carsService: CarsService;

    constructor() {
        this.carsService = new CarsService();
    }

    //---------- POST CAR ----------

    async CreateCar(req: Request, res: Response) {
        const createCarsDTO: CreateCarsDTO = req.body;
        try {
            const createdCar = await this.carsService.CreateCar(createCarsDTO);
            return res.status(201).json({ data: createdCar });
        } catch (error) {
            const errorMessage: string = (error as Error).message;
            return res.status(400).send({ message: errorMessage });
        }
    }

    //---------- GET ALL CARS ----------

    async GetAllCars(req: Request, res: Response) {
        try {
            const queryParams = req.query;

            if (Object.keys(queryParams).length) {
                const data = await this.carsService.GetAllCars(queryParams);
                return res.status(200).json({ data: data });
            } else {
                const data = await this.carsService.GetAllCars();
                return res.status(200).json({ data: data });
            }
        } catch (error) {
            const errorMessage: string = (error as Error).message;
            return res.status(400).send({ message: errorMessage });
        }
    }

    //---------- DELETE CAR BY ID ----------

    async DeleteCar(req: Request, res: Response) {
        try {
            await this.carsService.DeleteCarById(req.params.id as string);
            return res.status(204).send();
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('Car with ID')) {
                return res.status(404).send({ message: errorMessage });
            } else {
                return res.status(400).send({ message: 'Invalid ID format' });
            }
        }
    }

    //---------- UPDATE CAR BY ID ----------

    async UpdateCar(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const createCarsDTO: CreateCarsDTO = req.body;

        try {
            const updatedCar = await this.carsService.UpdateCarById(
                id,
                createCarsDTO
            );

            return res.status(200).json(updatedCar);
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('Car with ID')) {
                return res.status(404).send({ message: errorMessage });
            } else if (errorMessage.startsWith('Invalid ID format:')) {
                return res.status(400).send({ message: errorMessage });
            } else {
                return res
                    .status(400)
                    .send({ message: 'Invalid params format' });
            }
        }
    }

    //---------- GET CAR BY ID ----------

    async GetCar(req: Request, res: Response) {
        try {
            const data = await this.carsService.GetCarById(
                req.params.id as string
            );
            return res.status(200).json({ data: data });
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('Car with ID')) {
                return res.status(404).send({ message: errorMessage });
            } else {
                return res.status(400).send({ message: errorMessage });
            }
        }
    }
}
