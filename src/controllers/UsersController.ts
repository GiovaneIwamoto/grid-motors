import { Request, Response } from 'express';
import { CreateUserDTO } from '../DTO';
import { UsersService } from '../services';

export default class UsersController {
    private userService: UsersService;

    constructor() {
        this.userService = new UsersService();
    }

    //---------- POST USER ----------

    async CreateUser(req: Request, res: Response) {
        try {
            const createUserDTO: CreateUserDTO = req.body;

            const createdUser = await this.userService.CreateUser(
                createUserDTO
            );
            return res.status(201).json({ data: createdUser });
        } catch (error) {
            const errorMessage: string = (error as Error).message;
            return res.status(400).send({ message: errorMessage });
        }
    }

    //---------- GET ALL USERS ----------

    async GetAllUsers(req: Request, res: Response) {
        try {
            const queryParams = req.query;

            if (Object.keys(queryParams).length) {
                const data = await this.userService.GetAllUsers(queryParams);
                return res.status(200).json({ data: data });
            } else {
                const data = await this.userService.GetAllUsers();
                return res.status(200).json({ data: data });
            }
        } catch (error) {
            const errorMessage: string = (error as Error).message;
            return res.status(400).send({ message: errorMessage });
        }
    }

    //---------- DELETE USER BY ID ----------

    async DeleteUser(req: Request, res: Response) {
        try {
            await this.userService.DeleteUserById(req.params.id as string);
            return res.status(204).send();
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('User with ID')) {
                return res.status(404).send({ message: errorMessage });
            } else {
                return res.status(400).send({ message: 'Invalid ID format' });
            }
        }
    }

    //---------- UPDATE USER BY ID ----------
    async UpdateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const createdUsersDTO: CreateUserDTO = req.body;

        try {
            const updatedUser = await this.userService.UpdateUserById(
                id,
                createdUsersDTO
            );

            return res.status(200).json(updatedUser);
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('User with ID')) {
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
}
