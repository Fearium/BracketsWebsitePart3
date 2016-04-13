"use strict";
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
// DEFINE THE OBJECT SCHEMA
var teamsSchema = new mongoose.Schema({
    teamname: {
        type: String,
        default: '',
        trim: true,
        required: 'teamname is required'
    },
    createdby: {
        type: String,
        default: '',
        trim: true,
        required: 'createdby is required'
    },
    player1: {
        type: String,
        default: '',
        trim: true,
    },
    player2: {
        type: String,
        default: '',
        trim: true,
    },
    player3: {
        type: String,
        default: '',
        trim: true,
    },
    player4: {
        type: String,
        default: '',
        trim: true,
    },
    player5: {
        type: String,
        default: '',
        trim: true,
    },
    player6: {
        type: String,
        default: '',
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
}, { collection: 'teamInfo' });
teamsSchema.plugin(passportLocalMongoose);
// MAKE THIS PUBLIC SO THE CONTROLLER CAN SEE IT
exports.Teams = mongoose.model('Teams', teamsSchema);
//# sourceMappingURL=teams.js.map

//# sourceMappingURL=teams.js.map
