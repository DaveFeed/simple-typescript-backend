/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserRepository } from 'src/repositories/user-repository';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUser(id: string) {
        return this.userRepository.findById(id);
    }
}
