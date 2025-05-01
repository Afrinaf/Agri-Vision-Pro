const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    profilepicture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9olRhoEF2BaR6EQBQd48xoa8Wucs7Vml6Q&s"
    }
});
UserSchema.index({ name: "text", email: "text" });
const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User;
