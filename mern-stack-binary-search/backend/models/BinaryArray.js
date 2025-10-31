import mongoose from 'mongoose';

const binaryArraySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    binaryarray: {
        type: [Number],
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    category : {
        type: String,
        enum : ['partice', 'example', 'custom'],
        default: 'custom'
    }
}, {
    timestamps : true
})


const BinaryArray = new mongoose.model('BinaryArray', binaryArraySchema);

export default BinaryArray;