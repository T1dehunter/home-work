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
        const [document] = await Promise.all([
            this.model.findOne({userID}).exec(),
            this.model.findOne({userID: userID + 1}).exec(),
            this.model.findOne({userID: userID + 2}).exec(),
            this.model.findOne({userID: userID + 3}).exec(),
            this.model.findOne({userID: userID + 4}).exec(),
        ]);
        return document;
    }
}

export {UserData};
