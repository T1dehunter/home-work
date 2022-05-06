import {Injectable} from '@nestjs/common';

import {UserDataRepository} from 'repositories/user-data';

@Injectable()
export class LogUserData {
    constructor(private repository: UserDataRepository) {}

    async execute(params: {userID: number; userCity: string; userState: string}) {
        const result = await this.repository.create(params);

        return result;
    }
}
