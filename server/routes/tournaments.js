"use strict";
var express = require('express');
var router = express.Router();
var tournamentModel = require('../models/tournaments');
var Tournament = tournamentModel.Tournament;
/* Utility Function to check if user is authenticated */
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
// GET - show main users page - list all the users
router.get('/', requireAuth, function (req, res, next) {
    // use the Users model to query the Users collection
    Tournament.find(function (error, tournaments) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of users
            res.render('tournaments/index', {
                title: 'Tournaments',
                tournaments: tournaments
            });
        }
    });
});
// GET add page - show the blank form
router.get('/add', requireAuth, function (req, res, next) {
    res.render('tournaments/add', {
        title: 'Add a New Tournament'
    });
});
// POST add page - save the new user
router.post('/add', requireAuth, function (req, res, next) {
    Tournament.create({
        name: req.body.name,
        size: req.body.size,
        team: req.body.team
    }, function (error, Tournament) {
        // did we get back an error or valid Users object?
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/tournaments');
        }
    });
});
// GET edit page - show the current user in the form
router.get('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Tournament.findById(id, function (error, Tournament) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('tournaments/edit', {
                title: 'Tournament Details',
                tournament: Tournament
            });
        }
    });
});
// POST edit page - update the selected user
router.post('/:id', requireAuth, function (req, res, next) {
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
    Tournament.update({ _id: id }, tournament, function (error) {
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
router.get('/delete/:id', requireAuth, function (req, res, next) {
    // get the id from the url
    var id = req.params.id;
    // use the model and delete this record
    Tournament.remove({ _id: id }, function (error) {
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

//# sourceMappingURL=tournaments.js.map
