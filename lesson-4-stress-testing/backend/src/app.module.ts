import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MONGO_DB_URL} from './config';
import {AppController} from './controllers/app.controller';
import {FillUserData} from './usecases/fill-user-data';
import {GetUserData} from './usecases/get-user-data';
import {UserDataRepository} from './repositories/user-data';
import {UserData, UserDataSchema} from './repositories/user-data/schema';
@Module({
    imports: [
        MongooseModule.forRoot(MONGO_DB_URL),
        MongooseModule.forFeature([{name: UserData.name, schema: UserDataSchema}]),
    ],
    controllers: [AppController],
    providers: [FillUserData, GetUserData, UserDataRepository],
})
export class AppModule {}
