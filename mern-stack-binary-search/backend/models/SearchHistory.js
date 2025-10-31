import mongoose from 'mongoose';


const searchHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    array: [Number],
    target: Number,
    found: Boolean,
    index: Number,
    comparsion: Number,
    steps: [{
        stepNumber: Number,
        left: Number,
        right:Number,
        mid: Number,
        midValue: Number,
        comparsion: String,
        action: String,
        description: String
    }],
    timeTaken: Number,
    algorithmType: {
        type: String,
        enum: ['iteractive', 'recursive'],
        default: 'iteractive'
    }
}, {
    timestamps: true
});

const SearchHistory =  new mongoose.model('SearchHistory', searchHistorySchema);

export default SearchHistory;