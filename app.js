require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')


mongoose.connect(`${process.env.mongodb}`, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen('3000', () => {
    console.log('Now listening on port 3000')
})

module.exports = app