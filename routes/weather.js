const express = require("express"),
    router = express.Router();
const axios = require('axios');

// TASK 7
router.get('/weather/city/:city_name', (req, res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city_name}&APPID=7ac65faf3ca6cdc9a47ba1b3411e411b`)
        .then(response => {
            return res.status(200).json({
                "country": response.data.sys.country,
                "name": response.data.name,
                "temp": response.data.main.temp - 273.15,
                "min_temp": response.data.main.temp_min - 273.15,
                "max_temp": response.data.main.temp_max - 273.15,
                "latitude": response.data.coord.lat,
                "longitude": response.data.coord.lon
            })
        }).catch(err => {
            console.log(err.response.statusText);
        })
})

// TASK 8
router.get('/weather/search', (req, res) => {
    if (req.query.pin_code) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${req.query.pin_code},in&APPID=7ac65faf3ca6cdc9a47ba1b3411e411b`)
            .then(response => {
                return res.status(200).json({
                    "country": response.data.sys.country,
                    "name": response.data.name,
                    "temp": response.data.main.temp - 273.15,
                    "min_temp": response.data.main.temp_min - 273.15,
                    "max_temp": response.data.main.temp_max - 273.15,
                    "latitude": response.data.coord.lat,
                    "longitude": response.data.coord.lon
                })
            }).catch(err => {
                console.log(err);
            })
    } else {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${parseFloat(req.query.latitude)}&lon=${parseFloat(req.query.longitude)}&APPID=7ac65faf3ca6cdc9a47ba1b3411e411b`)
            .then(response => {
                return res.status(200).json({
                    "country": response.data.sys.country,
                    "name": response.data.name,
                    "temp": response.data.main.temp - 273.15,
                    "min_temp": response.data.main.temp_min - 273.15,
                    "max_temp": response.data.main.temp_max - 273.15,
                    "latitude": response.data.coord.lat,
                    "longitude": response.data.coord.lon
                })
            }).catch(err => {
                console.log(err);
            })
    }
})

module.exports = router;