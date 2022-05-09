import {Injectable} from '@nestjs/common';

type CacheItem = {expireAt: number; data: unknown};
type AppCache = Record<number, CacheItem>;

const TTL_IN_MS = 500_000;

@Injectable()
export class CacheService {
    private memoryStorage: AppCache = {};

    constructor() {
        console.log('CURRENT CACHE: ', this.memoryStorage);
    }

    private isCacheExpired(item: CacheItem): boolean {
        const now = new Date().getTime();
        return now >= item.expireAt;
    }

    private getRandomNumberFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private getExpirationInPercents(item: CacheItem) {
        const now = new Date().getTime();
        const timeToExpire = item.expireAt - now;
        const expireInPercents = 100 - parseFloat((timeToExpire / TTL_IN_MS).toPrecision(1)) * 100;
        return expireInPercents;
    }

    private isCacheProbabilisticExpired(item: CacheItem): boolean {
        const expireInPercents = this.getExpirationInPercents(item);
        const percentsRoll = this.getRandomNumberFromInterval(1, 100);
        // console.log('DEBUG DATA: ', {
        //     item,
        //     expireInPercents,
        //     percentsRoll,
        //     isExpired: expireInPercents >= percentsRoll,
        // });
        return expireInPercents >= percentsRoll;
    }

    getById(id: number) {
        const item = this.memoryStorage[id];

        if (!item) {
            return;
        }

        if (this.isCacheExpired(item)) {
            delete this.memoryStorage[id];
            return;
        }

        if (this.isCacheProbabilisticExpired(item)) {
            delete this.memoryStorage[id];
            return;
        }

        return item.data;
    }

    setById(id: number, data: unknown) {
        const now = new Date().getTime();
        const expireAt = now + TTL_IN_MS;
        this.memoryStorage[id] = {expireAt, data};
    }
}
