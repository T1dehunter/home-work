import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './controllers/app.controller';
import {ProcessData} from './usecases/process-data';
import {ProcessedDataRepository} from './repositories/processed-data';
import {ProcessedDataItem, ProcessedDataSchema} from './repositories/processed-data/schema';

@Module({
    imports: [
        // MongooseModule.forRoot('mongodb://localhost:27017/lesson-2'),
        // MongooseModule.forRoot('mongodb://localhost:27017/lesson-2'),
        MongooseModule.forRoot('mongodb://host.docker.internal:27017/lesson-2'),
        MongooseModule.forFeature([{name: ProcessedDataItem.name, schema: ProcessedDataSchema}]),
    ],
    controllers: [AppController],
    providers: [ProcessData, ProcessedDataRepository],
})
export class AppModule {}
