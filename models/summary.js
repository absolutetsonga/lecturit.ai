import { Schema, model, models } from 'mongoose';

const SummarySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User ID is required!'],
        ref: 'User',
    },

    summary: {
        type: String,
    },

    title: {
        type: String,
    },

    emoji: {
        type: String,
    },
});

const Summary = models.Summary || model('Summary', SummarySchema);

export default Summary;
