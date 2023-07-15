import { Schema, model, models } from 'mongoose';

const SummarySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    summary: {
        type: String,
    },
});

const Summary = models.Summary || model('Summary', SummarySchema);

export default Summary;
