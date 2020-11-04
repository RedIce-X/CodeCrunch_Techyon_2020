require("dotenv").config();

const express = require('express');

const app = express();

const countryRoutes = require('./routes/country');
const covidRoutes = require('./routes/covid');
const weatherRoutes = require('./routes/weather');
const twitterRoutes = require('./routes/twitter');
app.use(countryRoutes);
app.use(covidRoutes);
app.use(weatherRoutes);
app.use(twitterRoutes);

app.get('', (req, res) => {
  res.send('running')
})

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log("The server has started...");
});