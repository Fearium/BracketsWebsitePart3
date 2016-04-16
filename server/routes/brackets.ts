import express = require('express');
import passport = require('passport');
var router = express.Router();

// db references
import mongoose = require('mongoose');

//import model
import tournamentModel = require('../models/tournaments');
import Tournament = tournamentModel.Tournament;

import userModel = require('../models/user');
import User = userModel.User;

/* Utility Function to check if user is authenticated */
function requireAuth(req:express.Request, res:express.Response, next: any) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// GET - show main users page - list all the users
router.get('/', requireAuth, (req: express.Request, res: express.Response, next: any) => {
   
    // use the Users model to query the Users collection
    Tournament.find((error, tournaments) => {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of users
            res.render('brackets/index', {
                title: 'Tournaments',
                tournaments: tournaments,
                userName: req.user ? req.user.username : ''
            });
        }
    });
});