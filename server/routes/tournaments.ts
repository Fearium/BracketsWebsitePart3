import express = require('express');
import passport = require('passport');
var router = express.Router();

// db references
import mongoose = require('mongoose');
import tournamentModel = require('../models/tournaments');

import Tournament = tournamentModel.Tournament;

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
            res.render('tournaments/index', {
                title: 'My Tournaments',
                tournaments: tournaments,
                userName: req.user ? req.user.username : ''
            });
        }
    });
});

// GET add page - show the blank form
router.get('/add', requireAuth, (req: express.Request, res: express.Response, next: any) => {
    res.render('tournaments/add', {
        title: 'Add a New Tournament',
        userName: req.user ? req.user.username : ''
    });
});

// POST add page - save the new user
router.post('/add', requireAuth, (req: express.Request, res: express.Response, next: any) => {
    Tournament.create({
        name: req.body.name,
        size: req.body.size,
        team: Tournament.collection['TournamentInfo'].insert(req.body.team)
    }, (error, tournament) => {
        // did we get back an error or valid Users object?
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/tournaments');
        }
    })
});

// GET edit page - show the current user in the form
router.get('/:id', requireAuth, (req: express.Request, res: express.Response, next: any) => {

    var id = req.params.id;

    Tournament.findById(id, (error, Tournament) => {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('tournaments/edit', {
                title: 'Tournament Details',
                tournament: Tournament,
                userName: req.user ? req.user.userName : ''
            });
        }
    });
});

// POST edit page - update the selected user
router.post('/:id', requireAuth, (req: express.Request, res: express.Response, next: any) => {

    // grab the id from the url parameter
    var id = req.params.id;

    // create and populate a tournament object
    var tournament = new Tournament({
        _id: id,
        name: req.body.name,
        size: req.body.size,
        team: req.body.team
    });
    
    

    // run the update using mongoose and our model
    Tournament.update({ _id: id }, tournament, (error) => {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // if update is successful redirect to the users page
            res.redirect('/tournaments');
        }
    });
});

// GET delete user
router.get('/delete/:id', requireAuth, (req: express.Request, res: express.Response, next: any) => {

    // get the id from the url
    var id = req.params.id;

    // use the model and delete this record
    Tournament.remove({ _id: id }, (error) => {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // if removal worked redirect to users page
            res.redirect('/tournaments');
        }
    });
});


// make this public
module.exports = router;