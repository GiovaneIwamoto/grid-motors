import { Request, Response } from 'express';
import { CreateUserDTO } from '../DTO';
import { UsersService } from '../services';

export default class UsersController {
    private userService: UsersService;

    constructor() {
        this.userService = new UsersService();
    }

    //---------- POST USER ----------

    async createUser(req: Request, res: Response) {
        try {
            const createUserDTO: CreateUserDTO = req.body;

            const createdUser = await this.userService.createUser(
                createUserDTO
            );
            return res.status(201).json({ data: createdUser });
        } catch (error) {
            const errorMessage: string = (error as Error).message;
            return res.status(400).send({ message: errorMessage });
        }
    }
}
