const express = require('express');



const app = express();

const filmRoute = require('./routes/filmRoute');




app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use("/film", filmRoute)

module.exports = app;