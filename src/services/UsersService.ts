import { CreateUserDTO } from '../DTO';
import { UserRepository } from '../repositories';
import { IUser } from '../models/Users';
import axios from 'axios';

export default class UsersServices {
    _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }

    //---------- VIA CEP ----------

    fetchAddressFromCep = async (cep: any) => {
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

    async createUser(createUserDTO: CreateUserDTO) {
        try {
            const addressData = await this.fetchAddressFromCep(
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
}
