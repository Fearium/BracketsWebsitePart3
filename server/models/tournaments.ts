import mongoose = require('mongoose');
import passportLocalMongoose = require('passport-local-mongoose');

// DEFINE THE OBJECT SCHEMA
var tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Tournament name is required'
    },
    size: {
        type: Number,
        default: 16,
        trim: true,
        required: 'Size of tournament required'
    },
    teams: {
        type: Array,
        trim: true,
        required: 'Teams are required'
    },
     description: {
        type: String,
        trim: true,
    },
    createdby: {
        type: String,
        trim: true,
        required: 'Owner required'
    },
    
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
    { collection: 'tournamentInfo' });

// MAKE THIS PUBLIC SO THE CONTROLLER CAN SEE IT
export var Tournament = mongoose.model('Tournament', tournamentSchema);