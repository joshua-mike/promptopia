import { Schema, model, models } from 'mongoose';

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [prompt, 'Prompt is required'],
    },
    tag: {
        type: String,
        required: [tag, 'Tag is required'],
    },

});

const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;