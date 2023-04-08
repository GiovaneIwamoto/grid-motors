import { Request, Response } from 'express';
import { AuthenticateDTO, CreateUserDTO } from '../DTO';
import { UsersService } from '../services';

export default class UsersController {
    private userService: UsersService;

    constructor() {
        this.userService = new UsersService();
    }

    //---------- POST USER ----------

    async CreateUser(req: Request, res: Response) {
        try {
            const createUserDTO: CreateUserDTO | undefined = req.body;

            if (
                !createUserDTO ||
                !createUserDTO.cpf ||
                createUserDTO.cpf.length > 11
            ) {
                throw new Error('CPF must have at most 11 digits');
            }

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
        const createdUsersDTO: CreateUserDTO | undefined = req.body;

        try {
            if (
                !createdUsersDTO ||
                !createdUsersDTO.cpf ||
                createdUsersDTO.cpf.length > 11
            ) {
                throw new Error('CPF must have at most 11 digits');
            }

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

    //---------- GET USER BY ID ----------

    async GetUser(req: Request, res: Response) {
        try {
            const data = await this.userService.GetUserById(
                req.params.id as string
            );
            return res.status(200).json({ data: data });
        } catch (error) {
            const errorMessage: string = (error as Error).message;

            if (errorMessage.startsWith('User with ID')) {
                return res.status(404).send({ message: errorMessage });
            } else {
                return res.status(400).send({ message: errorMessage });
            }
        }
    }

    //---------- AUTHENTICATE USER ----------

    async AuthenticateUser(req: Request, res: Response) {
        try {
            const authenticateDTO: AuthenticateDTO = req.body;
            if (!(authenticateDTO.email && authenticateDTO.password)) {
                return res
                    .status(400)
                    .json({ message: 'Please provide email and password.' });
            }
            const user = await this.userService.Authenticate(authenticateDTO);
            if (user != null) {
                const token = this.userService.GenerateJwtToken(user);
                return res.status(200).json({
                    message: 'Logged in successfully!',
                    token,
                });
            } else {
                return res
                    .status(400)
                    .json({ message: 'Invalid email or password!' });
            }
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }
}
