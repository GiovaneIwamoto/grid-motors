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

    //---------- GET ALL RESERVES ----------

    async GetAllReserves(req: Request, res: Response) {
        try {
            const queryParams = req.query;

            if (Object.keys(queryParams).length) {
                const data = await this.reservesService.GetAllReserves(
                    queryParams
                );
                return res.status(200).json({ data: data });
            } else {
                const data = await this.reservesService.GetAllReserves();
                return res.status(200).json({ data: data });
            }
        } catch (error) {
            const errorMessage: string = (error as Error).message;
            return res.status(400).send({ message: errorMessage });
        }
    }
}
