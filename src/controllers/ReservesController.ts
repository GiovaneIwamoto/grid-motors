import { Request, Response } from 'express';
import { CreateReserveDTO } from '../DTO';
import { ReservesService } from '../services';

export default class ReservesController {
    private reservesService: ReservesService;

    constructor() {
        this.reservesService = new ReservesService();
    }

    //---------- POST RESERVE ----------

    async CreateReserve(req: Request, res: Response) {
        const createReserveDTO: CreateReserveDTO = req.body;
        try {
            const createdReserve = await this.reservesService.CreateReserve(
                createReserveDTO
            );
            return res.status(201).json({ data: createdReserve });
        } catch (error) {
            const errorMessage: string = (error as Error).message;
            return res.status(400).send({ message: errorMessage });
        }
    }
}
