import {Injectable} from '@nestjs/common';
import {Client} from '@elastic/elasticsearch';

import {ELASTIC_SEARCH_URL} from 'config';

@Injectable()
export class ElasticsearchClient {
    private getClient() {
        return new Client({
            node: ELASTIC_SEARCH_URL,
        });
    }

    public async addData(params: {indexName: string; data: Record<string, string>}): Promise<void> {
        const {indexName, data} = params;
        const client = this.getClient();

        const elasticIndex = await client.indices.exists({index: indexName});

        if (!elasticIndex) {
            await client.indices.create({index: indexName});
        }

        await client.index(
            {
                index: indexName,
                body: data,
            },
            {},
        );

        await client.indices.refresh({index: indexName});
    }

    public async searchData(params: {indexName: string; query: {match: Record<string, string>}}): Promise<any> {
        const {indexName, query} = params;
        const client = this.getClient();

        const elasticIndex = await client.indices.exists({index: indexName});
        if (!elasticIndex) {
            return;
        }

        const result = await client.search({
            index: indexName,
            body: {
                query,
            },
        });

        return result;
    }
}
