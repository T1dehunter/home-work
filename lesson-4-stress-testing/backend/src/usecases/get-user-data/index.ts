import {Injectable} from '@nestjs/common';

import {ITEMS_COUNT} from 'config';
import {CacheService} from 'services/cache.service';
import {UserDataRepository} from 'repositories/user-data';

@Injectable()
export class GetUserData {
    constructor(private cacheService: CacheService, private repository: UserDataRepository) {}

    private getRandomUserID() {
        const usersIds = Array.from({length: ITEMS_COUNT}).map((_, index) => index + 1);
        const randomID = usersIds[Math.floor(Math.random() * usersIds.length)];
        return randomID;
    }

    async execute() {
        const randomUserId = this.getRandomUserID();
        const cachedData = this.cacheService.getById(randomUserId);

        if (cachedData) {
            return cachedData;
        }

        const userData = await this.repository.findByUserID(randomUserId);

        this.cacheService.setById(userData.userID, userData);

        return userData || {};
    }
}
