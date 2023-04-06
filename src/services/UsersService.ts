import { AuthenticateDTO, CreateUserDTO } from '../DTO';
import { UserRepository } from '../repositories';
import { isValidObjectId } from 'mongoose';
import { IUser } from '../models/Users';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default class UsersServices {
    _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }

    //---------- VIA CEP ----------

    FetchAddressFromCep = async (cep: any) => {
        try {
            const response = await axios.get(
                `https://viacep.com.br/ws/${cep}/json`
            );
            const { logradouro, complemento, bairro, localidade, uf } =
                response.data;
            return {
                patio: logradouro,
                complement: complemento,
                neighborhood: bairro,
                locality: localidade,
                uf: uf,
            };
        } catch (error) {
            throw new Error(`Invalid CEP: ${cep}`);
        }
    };

    //---------- POST USER ----------

    async CreateUser(createUserDTO: CreateUserDTO) {
        try {
            const addressData = await this.FetchAddressFromCep(
                createUserDTO.cep
            );

            const user = {
                name: createUserDTO.name,
                cpf: createUserDTO.cpf,
                birth: createUserDTO.birth,
                email: createUserDTO.email,
                password: createUserDTO.password,
                cep: createUserDTO.cep,
                qualified: createUserDTO.qualified,
                patio: addressData.patio,
                complement: addressData.complement,
                neighborhood: addressData.neighborhood,
                locality: addressData.locality,
                uf: addressData.uf,
            };

            return await this._userRepository.create(user as IUser);
        } catch (error) {
            throw error;
        }
    }

    //---------- GET ALL USERS ----------

    async GetAllUsers(queryParams?: any) {
        return await this._userRepository.findAll(queryParams);
    }

    //---------- DELETE USER BY ID ----------

    async DeleteUserById(id: string) {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid ID format: ${id}`);
        }
        const result = await this._userRepository.delete(id);

        if (!result) {
            throw new Error(`User with ID ${id} not found`);
        }
        return result;
    }

    //---------- UPDATE USER BY ID ----------

    async UpdateUserById(
        id: string,
        updateUserDTO: CreateUserDTO
    ): Promise<IUser> {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid ID format: ${id}`);
        }

        const user = await this._userRepository.findById(id);

        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }

        delete updateUserDTO.patio;
        delete updateUserDTO.complement;
        delete updateUserDTO.neighborhood;
        delete updateUserDTO.locality;
        delete updateUserDTO.uf;

        if (updateUserDTO.cep !== user.cep) {
            const addressData = await this.FetchAddressFromCep(
                updateUserDTO.cep
            );

            user.patio = addressData.patio;
            user.complement = addressData.complement;
            user.neighborhood = addressData.neighborhood;
            user.locality = addressData.locality;
            user.uf = addressData.uf;

            await user.save();
        }

        const updatedUser = await this._userRepository.update(
            id,
            updateUserDTO
        );

        if (!updatedUser) {
            throw new Error(`User with ID ${id} not found`);
        }

        return updatedUser;
    }

    //---------- GET USER BY ID ----------

    async GetUserById(id: string) {
        if (!isValidObjectId(id)) {
            throw new Error(`Invalid ID format: ${id}`);
        }

        const result = await this._userRepository.findById(id);

        if (!result) {
            throw new Error(`User with ID ${id} not found`);
        }

        return result;
    }

    //---------- AUTHENTICATE USER ----------

    async Authenticate(
        userAuthenticate: AuthenticateDTO
    ): Promise<IUser | null> {
        const user = await this._userRepository.findEmail(
            userAuthenticate.email
        );

        if (user && user.password === userAuthenticate.password) {
            return user;
        } else {
            return null;
        }
    }

    //---------- GENERATE USER TOKEN ----------

    GenerateJwtToken(user: IUser): string {
        const payload = { id: user.id, email: user.email };
        const options = { expiresIn: '1h' };
        return jwt.sign(payload, 'secret', options);
    }
}
