const express = require('express');
const managerDAO = require('../models/agbModel');
const db = new managerDAO("users.db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.welcome_page = function (req, res) {
    res.redirect('/index.html')
};
exports.home_page = function (req, res) {
    res.redirect('/home.html')
};
exports.about_us = function (req, res) {
    res.redirect('/about.html')
};
exports.real_aboutus = function (req, res) {
    res.redirect('/aboutus.html')
};
exports.programs = function (req, res) {
    res.redirect('/programs.html')
};

exports.signin = function (req, res) {
    res.render('user/login')
}
exports.signup = function (req, res) {
    res.render('user/signup')
}

exports.manager_add = function (req, res) {
    res.redirect('/addstaff.html')
};
exports.manager_delete = function (req, res) {
    res.redirect('/delstaff.html')
};
exports.manager_update = function (req, res) {
    res.redirect('/updstaff.html')
};
exports.staff_list = function (req, res) {
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
exports.newStaff = function (req, res) {
    db.newStaff(req.body.name)
    res.redirect('/manager')
};
exports.staffUpdate = function (req, res) {
    if (!req.body._id) {
        console.log("That staff does not exist")
    } else {
        console.log(`Staff ID: ${req.body._id}`);
        db.staffUpdate(req.body._id, req.body.name);
        res.redirect('/manager');
    }
};
exports.remove = function (req, res) {
    if (!req.body._id) {
        console.log("Unsuccessful");
    } else {
        console.log(`ID: ${req.body._id}`);
        db.remove(req.body._id);
        res.redirect('/manager');
    }
};

exports.post_new_user = function (req, res) {
    const user = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!user || !email || !password) {
        res.status(400)
        res.send("No such user found");
        return;
    }
    db.lookup(user, function (err, u) {
        if (u) {
            res.send("User found: ", user)
        }
        db.create(user, email, password);
        console.log("Register User:", user, "Password:", password);
        res.redirect('/signin')
    });
}

exports.login = function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    db.lookup(email, function (err, user) {
        if (err) {
            console.log("error looking up user", err)
            return res.status(401).send();
        }
        if (!user) {
            console.log("user ", email, "not found");
            return res.render('user/signup')
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let payload = { email: user.email };
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
                res.cookie("jwt", accessToken);
                next();
            } else {
                return res.render('user/login')
            }
        });
    });
}

exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
        return res.status(403).send();
    }
    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (e) {
        
        res.status(401).send();
    }
};

exports.logout = function(req, res) {
    res.clearCookie("jwt").status(200).redirect("/exit");
}

exports.exit = function(req, res){
    res.redirect('/logout.html')
}