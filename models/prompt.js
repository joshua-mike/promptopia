import { Schema, model, models } from 'mongoose';

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
    }

})