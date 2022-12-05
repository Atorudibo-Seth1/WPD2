const express = require('express');
const nedb = require('nedb')
const app = express();
const mustache = require('mustache-express')
require('dotenv').config() // loads data from .env file

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const router = require('./routes/agbRoutes');
const path = require('path');
const public = path.join(__dirname, 'public');
app.use(express.static(public));

app.use(express.urlencoded({ extended: false }))

app.engine('mustache', mustache());
app.set('view engine', 'mustache')

app.use('/', router);


app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.') 
});