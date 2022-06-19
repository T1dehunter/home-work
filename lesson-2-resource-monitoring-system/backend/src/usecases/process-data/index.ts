import {Injectable} from '@nestjs/common';

import {ProcessedDataRepository, ProcessedDataItem} from 'repositories/processed-data';
import {ElasticsearchClient} from 'services/elasticsearch.client';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SHA256 = require('crypto-js/sha256');

type DataItem = {city: string; state: string};
type HashData = {hash1: string; hash2: string; hash3: string};

const ES_INDEX = 'test_elastic_index_name';

@Injectable()
export class ProcessData {
    constructor(private repository: ProcessedDataRepository, private elasticSearchClient: ElasticsearchClient) {}

    private calculateData(dataItem: DataItem) {
        const cityName = dataItem.city;
        const reversedCityName = cityName.split('').reverse().join('');
        const hash1 = SHA256(cityName);
        const hash2 = SHA256(reversedCityName);
        const hash3 = SHA256(`${cityName}${reversedCityName}`);
        return {hash1, hash2, hash3};
    }

    private async addToDb(item: DataItem, hash: HashData) {
        const existsItem = await this.repository.findByCityState(item);
        if (existsItem) {
            return existsItem;
        }
        const createdItem = await this.repository.create({city: item.city, state: item.state, ...hash});
        return createdItem;
    }

    private async addToElastic(item: ProcessedDataItem) {
        const testHash = `${item.hash1}:${item.hash2}:${item.hash3}`;
        const existsData = await this.elasticSearchClient.searchData({
            indexName: ES_INDEX,
            query: {match: {hash: testHash}},
        });
        if (existsData) {
            return existsData;
        }
        await this.elasticSearchClient.addData({indexName: ES_INDEX, data: {hash: testHash}});
    }

    async execute(data: DataItem[]) {
        const result: any[] = [];

        for (const item of data) {
            const hashData = this.calculateData(item);
            const dataFromDB = await this.addToDb(item, hashData);
            const dataFromElastic = await this.addToElastic(dataFromDB);

            result.push({db: dataFromDB, elastic: dataFromElastic});
        }

        return result;
    }
}
