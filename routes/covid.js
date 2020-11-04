const express = require("express"),
    router = express.Router();
const axios = require('axios');

// TASK 4
router.get('/covid/country/name/:name', async (req, res) => {
    var country = req.params.name;
    try {
        var data = await axios({
            url: 'https://corona.lmao.ninja/v2/countries/' + country,
            method: 'get',
        })
        console.log(data.data)
        res.status(200).json({
            'country': data.data.country,
            "confirmed": data.data.cases,
            "recovered": data.data.deaths,
            "critical": data.data.deaths,
            "deaths": data.data.critical
        })
    } catch (e) {
        if (e.response.status) {
            res.status(e.response.status).json({
                status: e.response.status,
                message: 'no records found'
            })
        } else {
            res.status(e.response.status).json({
                status: e.response.status,
                message: e.response.message
            })
        }
    }
})

// TASK 5
router.get('/covid/country/code/:name', async (req, res) => {
    var country = req.params.name;
    try {
        var data = await axios({
            url: 'https://corona.lmao.ninja/v2/countries/' + country,
            method: 'get',

        })
        console.log(data.data)
        res.status(200).json({
            'country': data.data.country,
            "confirmed": data.data.cases,
            "recovered": data.data.deaths,
            "critical": data.data.deaths,
            "deaths": data.data.critical

        })
    } catch (e) {
        if (e.response.status) {
            res.status(e.response.status).json({
                status: e.response.status,
                message: 'no records found'
            })
        } else {
            res.status(e.response.status).json({
                status: e.response.status,
                message: e.response.message
            })
        }
    }
})

// TASK 6
router.get('/covid/country/search', async (req, res) => {
    var country = req.query.searchText;
    console.log(country)
    try {
        var data = await axios({
            url: 'https://corona.lmao.ninja/v2/countries/' + country,
            method: 'get',

        })
        console.log(data.data)
        res.status(200).json({
            'country': data.data.country,
            "confirmed": data.data.cases,
            "recovered": data.data.deaths,
            "critical": data.data.deaths,
            "deaths": data.data.critical

        })
    } catch (e) {
        if (e.response.status) {
            res.status(e.response.status).json({
                status: e.response.status,
                message: 'no records found'
            })
        } else {
            res.status(e.response.status).json({
                status: e.response.status,
                message: e.response.message
            })
        }
    }
})

module.exports = router;