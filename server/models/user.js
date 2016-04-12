"use strict";
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
// DEFINE THE OBJECT SCHEMA
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
}, { collection: 'userInfo' });
var options = ({ missingPasswordError: "Wrong password" });
userSchema.plugin(passportLocalMongoose, options);
// MAKE THIS PUBLIC SO THE CONTROLLER CAN SEE IT
exports.User = mongoose.model('User', userSchema);

//# sourceMappingURL=user.js.map
