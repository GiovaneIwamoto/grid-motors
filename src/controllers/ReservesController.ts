import { Request, Response } from 'express';
import { CreateReserveDTO } from '../DTO';
import { UpdateReserveDTO } from '../DTO';
import { ReservesService } from '../services';

export default class ReservesController {
    private reservesService: ReservesService;

    constructor() {
        this.reservesService = new ReservesService();
    }

    //---------- POST RESERVE ----------

    async CreateReserve(req: Request, res: Response) {
        const createReserveDTO: CreateReserveDTO = req.body;
        const token: string = req.headers.authorization?.split(' ')[1] || '';

        try {
            const createdReserve = await this.reservesService.CreateReserve(
                createReserveDTO,
                token
            );
            return res.status(201).json({ data: createdReserve });
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('Car with ID:')) {
                return res.status(404).send({ message: errorMessage });
            }
            if (
                errorMessage.startsWith(
                    'User is not qualified to create a reservation'
                )
            ) {
                return res.status(400).send({ message: errorMessage });
            } else {
                return res.status(400).send({ message: errorMessage });
            }
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

    //---------- DELETE RESERVE BY ID ----------

    async DeleteReserve(req: Request, res: Response) {
        try {
            await this.reservesService.DeleteReserveById(
                req.params.id as string
            );
            return res.status(204).send();
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('Reserve with ID')) {
                return res.status(404).send({ message: errorMessage });
            } else {
                return res.status(400).send({ message: 'Invalid ID format' });
            }
        }
    }

    //---------- UPDATE RESERVE BY ID ----------

    async UpdateReserve(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const updateReserveDTO: UpdateReserveDTO = req.body;

        try {
            const updatedReserve = await this.reservesService.UpdateReserveById(
                id,
                updateReserveDTO
            );

            return res.status(200).json(updatedReserve);
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('Reserve with ID')) {
                return res.status(404).send({ message: errorMessage });
            } else if (errorMessage.startsWith('Invalid ID format:')) {
                return res.status(400).send({ message: errorMessage });
            } else if (errorMessage.startsWith('Car with ID')) {
                return res.status(404).send({ message: errorMessage });
            } else {
                return res.status(400).send({ message: errorMessage });
            }
        }
    }

    //---------- GET RESERVE BY ID ----------

    async GetReserve(req: Request, res: Response) {
        try {
            const data = await this.reservesService.GetReserveById(
                req.params.id as string
            );
            return res.status(200).json({ data: data });
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('Reserve with ID')) {
                return res.status(404).send({ message: errorMessage });
            } else {
                return res.status(400).send({ message: errorMessage });
            }
        }
    }
}
