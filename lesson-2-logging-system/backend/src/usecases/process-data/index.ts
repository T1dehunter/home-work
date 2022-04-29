import {Injectable} from '@nestjs/common';

import {ProcessedDataRepository} from 'repositories/processed-data';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SHA256 = require('crypto-js/sha256');

@Injectable()
export class ProcessData {
    constructor(private repository: ProcessedDataRepository) {}

    async execute(data: {city: string; state: string}[]) {
        const result: any[] = [];

        for (const item of data) {
            const existsItem = await this.repository.findByCityState(item);
            if (existsItem) {
                continue;
            }
            const hash1 = SHA256(item.city);
            const hash2 = SHA256(item.city);
            const hash3 = SHA256(item.city);
            const createdItem = await this.repository.create({city: item.city, state: item.state, hash1, hash2, hash3});
            result.push(createdItem);
        }

        return result;
    }
}
