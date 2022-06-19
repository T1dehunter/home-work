import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_DB_URL} from './config';
import {AppController} from './controllers/app.controller';
import {MetricsController} from './controllers/metrics.controller';
import {ProcessData} from './usecases/process-data';
import {ProcessedDataRepository} from './repositories/processed-data';
import {ProcessedDataItem, ProcessedDataSchema} from './repositories/processed-data/schema';
import {MetricsService} from './services/metrics.service';
import {PrometheusClient} from './services/prometheus.client';
import {ElasticsearchClient} from './services/elasticsearch.client';
@Module({
    imports: [
        MongooseModule.forRoot(MONGO_DB_URL),
        MongooseModule.forFeature([{name: ProcessedDataItem.name, schema: ProcessedDataSchema}]),
    ],
    controllers: [AppController, MetricsController],
    providers: [ProcessData, ProcessedDataRepository, MetricsService, PrometheusClient, ElasticsearchClient],
})
export class AppModule {}
