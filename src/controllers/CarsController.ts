import { Request, Response } from 'express';
import { CreateCarsDTO } from '../DTO';
import { CarsService } from '../services';

export default class CarsController {
    carsService: CarsService;

    constructor() {
        this.carsService = new CarsService();
    }

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
}
