import {Injectable} from '@nestjs/common';

import {UserDataRepository} from 'repositories/user-data';
import {ITEMS_COUNT} from 'config';

import {cities} from './cities';

type City = {name: string; state: string};

@Injectable()
export class FillUserData {
    constructor(private repository: UserDataRepository) {}

    private getCities(): City[] {
        return Object.entries(cities).flatMap(([state, cities]) => {
            return cities.map((name) => {
                return {name, state};
            });
        });
    }

    private getRandomCity(cities: City[]): City {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        return randomCity;
    }

    private getUserIds(): number[] {
        return Array.from({length: ITEMS_COUNT}).map((_, index) => index + 1);
    }

    async execute() {
        const userIds = this.getUserIds();
        const cities = this.getCities();

        for (const id of userIds) {
            const randomCity = this.getRandomCity(cities);
            await this.repository.create({userID: id, userCity: randomCity.name, userState: randomCity.state});
        }
    }
}
