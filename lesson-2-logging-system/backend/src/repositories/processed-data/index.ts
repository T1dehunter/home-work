import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {ProcessedDataItem, ProcessedDataItemDocument} from './schema';

@Injectable()
export class ProcessedDataRepository {
    constructor(@InjectModel(ProcessedDataItem.name) private catModel: Model<ProcessedDataItemDocument>) {}

    async create(data: {
        city: string;
        state: string;
        hash1: string;
        hash2: string;
        hash3: string;
    }): Promise<ProcessedDataItem> {
        const createdCat = new this.catModel(data);
        return createdCat.save();
    }

    async findByCityState(params: {city: string; state: string}): Promise<ProcessedDataItem> {
        return this.catModel.findOne(params).exec();
    }
}

export {ProcessedDataItem};
