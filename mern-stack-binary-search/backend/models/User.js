import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 6
   },
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase:  true
   },
   password: {
    type: String,
    required:true
   },
   stats: {
    totalSearches: { type:  Number, default: 0},
    successfulSearches: { type: Number, default: 0},
    averageComparsions: { type: Number, default: 0}
   }
}, {
    timestamps : true
})

const User =  mongoose.model('User', userSchema);

export default User;
