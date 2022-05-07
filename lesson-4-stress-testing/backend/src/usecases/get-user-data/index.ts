import {Injectable} from '@nestjs/common';

import {UserDataRepository} from 'repositories/user-data';

@Injectable()
export class GetUserData {
    constructor(private repository: UserDataRepository) {}

    async execute(userID: number) {
        const userData = await this.repository.findByUserID(userID);
        return userData || {};
    }
}
