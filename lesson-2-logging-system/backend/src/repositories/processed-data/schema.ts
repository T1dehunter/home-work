import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type ProcessedDataItemDocument = ProcessedDataItem & Document;

@Schema({collection: 'processed_data', timestamps: true})
export class ProcessedDataItem {
    @Prop({type: String, required: true})
    city: string;

    @Prop({type: String, required: true})
    state: string;

    @Prop({type: String, required: true})
    hash1: string;

    @Prop({type: String, required: true})
    hash2: string;

    @Prop({type: String, required: true})
    hash3: string;
}

export const ProcessedDataSchema = SchemaFactory.createForClass(ProcessedDataItem);
