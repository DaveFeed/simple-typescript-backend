import { UserRepository } from 'src/repositories/user';

import { ShortUserInfo } from 'src/services/user/types';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUser(id: number): Promise<ShortUserInfo> {
        return this.userRepository.findById(id);
    }
}
