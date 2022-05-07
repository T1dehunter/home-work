import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {UserData, UserDataDocument} from './schema';

@Injectable()
export class UserDataRepository {
    constructor(@InjectModel(UserData.name) private model: Model<UserDataDocument>) {}

    async create(data: {userID: number; userCity: string; userState: string}): Promise<UserData> {
        const document = new this.model(data);
        return document.save();
    }

    async findByUserID(userID: number): Promise<UserData> {
        const document = this.model.findOne({userID}).exec();
        return document;
    }
}

export {UserData};
