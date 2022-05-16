import {Injectable} from '@nestjs/common';

import {USERS_COUNT} from 'config';
import {CacheService} from 'services/cache.service';
import {UserDataRepository} from 'repositories/user-data';

@Injectable()
export class GetUserData {
    constructor(private cacheService: CacheService, private repository: UserDataRepository) {}

    private getRandomUserID() {
        const usersIds = Array.from({length: USERS_COUNT}).map((_, index) => index + 1);
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

        if (userData) {
            this.cacheService.setById(userData.userID, userData);
        }

        return userData;
    }

    async execute1() {
        const userID = 1000;
        const userData = await this.repository.findByUserID(userID);

        this.cacheService.setById(userData.userID, userData);

        const cachedData = this.cacheService.getById(userID);

        let attemps = 1;
        const intID = setInterval(() => {
            const cachedData = this.cacheService.getById(userID);
            attemps += 1;
            if (attemps === 10) {
                clearInterval(intID);
            }
        }, 1000);
        if (cachedData) {
            return cachedData;
        }
    }
}
