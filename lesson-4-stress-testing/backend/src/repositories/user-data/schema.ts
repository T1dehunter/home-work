import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UserDataDocument = UserData & Document;

@Schema({collection: 'logged-data', timestamps: true})
export class UserData {
    @Prop({type: Number, required: true})
    userID: number;

    @Prop({type: String, required: true})
    userCity: string;

    @Prop({type: String, required: true})
    userState: string;
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
