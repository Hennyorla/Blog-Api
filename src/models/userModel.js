const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },  
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    verificationToken: {
        type: String
        
    },
    verificationTokenExpiresIn: {
        type: Date,
        default: Date.now(),
    },
},{timestamps: true}
);

const user = mongoose.model("user", userSchema);

module.exports = user;