const express = require("express"),
    router = express.Router();
const axios = require('axios')
var https = require('https');

// TASK 4
router.get('/covid/country/name/:name', async (req, res) => {
    var country = req.params.name;
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    var options = {
        "rejectUnauthorized": false,
        method: 'GET',
        url: 'https://covid19-api.com/country?name=+' + country + '&format=json',
        headers: {
            'x-rapidapi-key': `${process.env.COVID_API_KEY}`,
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        },
        httpsAgent: agent
    };
    try {
        var data = await axios(options)
        res.status(200).json({
            'country': data.data[0].country,
            "confirmed": data.data[0].confirmed,
            "recovered": data.data[0].deaths,
            "critical": data.data[0].deaths,
            "deaths": data.data[0].critical
        })
    } catch (e) {
        res.status(404).json({
            status: 404,
            message: 'no records found'
        })
    }
})

// TASK 5
router.get('/covid/country/code/:name', async (req, res) => {
    var country = req.params.name;
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    var options = {
        "rejectUnauthorized": false,
        method: 'GET',
        url: 'https://covid19-api.com/country/code?code=+' + country + '&format=json',
        headers: {
            'x-rapidapi-key': `${process.env.COVID_API_KEY}`,
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        },
        httpsAgent: agent


    };
    try {
        var data = await axios(options)
        res.status(200).json({
            'country': data.data[0].country,
            "confirmed": data.data[0].confirmed,
            "recovered": data.data[0].deaths,
            "critical": data.data[0].deaths,
            "deaths": data.data[0].critical

        })
    } catch (e) {
        res.status(404).json({
            status: 404,
            message: 'no records found'
        })
    }
})

// TASK 6
router.get('/covid/country/search', async (req, res) => {
    var country = req.query.searchText;
    var url;
    if (country.length <= 3 && country.length >= 2) {
        url = 'https://covid19-api.com/country/code?code=+' + country + '&format=json'
    } else {
        url = 'https://covid19-api.com/country?name=+' + country + '&format=json'
    }
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    var options = {
        "rejectUnauthorized": false,
        method: 'GET',
        url: url,
        headers: {
            'x-rapidapi-key': `${process.env.COVID_API_KEY}`,
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        },
        httpsAgent: agent
    };
    try {
        var data = await axios(options)
        res.status(200).json({
            'country': data.data[0].country,
            "confirmed": data.data[0].confirmed,
            "recovered": data.data[0].deaths,
            "critical": data.data[0].deaths,
            "deaths": data.data[0].critical
        })
    } catch (e) {
        res.status(404).json({
            status: 404,
            message: 'no records found'
        })
    }
})

module.exports = router;