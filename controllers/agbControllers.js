const express = require('express');
const managerDAO = require('../models/agbModel');
const db = new managerDAO("users.db"); 

exports.welcome_page = function(req, res) {
    res.redirect('/index.html')
};
exports.home_page = function(req, res) {
    res.redirect('/home.html')
};
exports.about_us = function(req, res) {
    res.redirect('/about.html')
};
exports.real_aboutus = function(req, res) {
    res.redirect('/aboutus.html')
};
exports.programs = function(req, res) {
    res.redirect('/programs.html') 
};
exports.signin = function(req, res) {
    res.redirect('/signin.html')
};
exports.signup = function(req, res) {
    res.redirect('/signup.html')
};
exports.logout = function(req, res) {
    res.redirect('/logout.html')
};
exports.manager_add = function(req, res) {
    res.redirect('/addstaff.html')
};
exports.manager_delete = function(req, res) {
    res.redirect('/delstaff.html')
};
exports.manager_update = function(req, res) {
    res.redirect('/updstaff.html')
};
exports.staff_list = function(req, res) {
    db.getAllEntries()
        .then((entries) => {
            res.render('manager', {
                staff: entries,
            })
            console.log("Successfully displayed");
        })
        .catch((err) => {
            console.log(err);
        })
};
exports.newStaff = function(req, res) {
    db.newStaff(req.body.name)
    res.redirect('/manager')
};
exports.staffUpdate = function(req, res) {
    if(!req.body._id) {
        console.log("That staff does not exist")
    } else {
        console.log(`Staff ID: ${req.body._id}`);
        db.staffUpdate(req.body._id, req.body.name);
        res.redirect('/manager');
    }
};
exports.remove = function(req, res) {
    if(!req.body._id) {
        console.log("Unsuccessful");
    } else {
        console.log(`ID: ${req.body._id}`);
        db.remove(req.body._id);
        res.redirect('/manager');
    }
};
exports.register = function(req, res) {
    db.register(req.body.name, req.body.email, req.body.password)
    console.log(`[
    Name: ${req.body.name}
    Email: ${req.body.email}
    Password: ${req.body.password}
]`)
    res.redirect('/signin.html')
}  