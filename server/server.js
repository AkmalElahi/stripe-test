const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3001;

//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const stripeRouter = require('./controllers/stripe');

app.use('/api', stripeRouter); 


app.listen(PORT, function () {

    console.log("HTTP Server is running on Port: " + PORT);
});