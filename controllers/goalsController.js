const express = require('express');
const goalsDAO = require('../models/goalsModel');
const db = new goalsDAO("goals.db"); 

exports.goals_add = function(req, res){
    res.redirect('/goals.html')
}

exports.goals_delete = function(req, res){
    res.redirect('/remgoal.html')
}

exports.goals_update = function(req, res){
    res.redirect('/updgoal.html')
}

exports.goals = function (req, res) {
    db.viewAllGoals()
        .then((goals) => {
            res.render('goals', {
                goal: goals,
            })
            console.log("Successfully displayed");
        })
        .catch((err) => {
            console.log(err);
        })
};

exports.newGoal = function (req, res) {
    db.newGoal(req.body.category, req.body.title, req.body.description, req.body.startdate, req.body.enddate)
    console.log(`[
    Category: ${req.body.category}
    Title: ${req.body.title}
    Description: ${req.body.description}
    Start Date: ${req.body.startdate}
    End Date: ${req.body.enddate}
]`)
    res.redirect('/goals')
}


exports.removeGoal = function(req, res) {
    if(!req.body.title) {
        console.log("Unsuccessful");
    } else {
        console.log(`Goal Title: ${req.body.title}`);
        db.removeGoal(req.body.title);
        res.redirect('/goals');
    }
};


exports.goalUpdate = function(req, res) {
    if(!req.body.title) {
        console.log("That goal does not exist")
    } else {
        console.log(`Goal Title: ${req.body.title}`);
        db.goalUpdate(req.body.title, req.body.description);
        res.redirect('/goals');
    }
};