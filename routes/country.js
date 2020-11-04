const express = require("express"),
    router = express.Router();
const axios = require('axios');

// TASK 1
router.get('/country/name/:name', async (req, res) => {
    var country = req.params.name;
    try {
        var data = await axios({
            url: 'https://restcountries.eu/rest/v2/name/' + country + '?fullText=true',
            method: 'get',

        })
        res.status(200).json({
            "name": data.data[0].name,
            "alpha2Code": data.data[0].alpha2Code,
            "alpha3Code": data.data[0].alpha3Code,
            "capital": data.data[0].capital,
            "region": data.data[0].region,
            "population": data.data[0].population,
            "flag": data.data[0].flag,
            "totalLanguages": data.data[0].languages.length,
            "totalCurrencies": data.data[0].currencies.length

        })
    } catch (e) {
        console.log(e.response.status)
        if (e.response.status) {
            res.status(e.response.status).json({
                status: e.response.status,
                message: 'country not found'
            })
        } else {
            res.status(e.response.status).json({
                status: e.response.status,
                message: e.response.message
            })
        }

    }
})

// TASK 2
router.get('/country/code/:country_code', async (req, res) => {
    var country = req.params.country_code;
    try {
        var data = await axios({
            url: 'https://restcountries.eu/rest/v2/alpha/' + country,
            method: 'get',

        })

        res.status(200).json({
            "name": data.data.name,
            "alpha2Code": data.data.alpha2Code,
            "alpha3Code": data.data.alpha3Code,
            "capital": data.data.capital,
            "region": data.data.region,
            "population": data.data.population,
            "flag": data.data.flag,
            "totalLanguages": data.data.languages.length,
            "totalCurrencies": data.data.currencies.length,
            "totalTimezones": data.data.timezones.length,

        })
    } catch (e) {
        if (e.response.status) {
            res.status(e.response.status).json({
                status: e.response.status,
                message: 'country not found'
            })
        } else {
            res.status(e.response.status).json({
                status: e.response.status,
                message: e.response.statusText
            })
        }
    }
})

//TASK 3
router.get('/country/search', async (req, res) => {
    var country = req.query.searchText;
    var url = 'https://restcountries.eu/rest/v2/name/' + country
    if (/^\d+$/.test(country)) {
        url = 'https://restcountries.eu/rest/v2/callingcode/' + country
        try {
            var data = await axios({

                url: url,
                method: 'get',

            })
            console.log(data)
            res.status(200).json({
                "name": data.data.name,

                "capital": data.data[0].capital,
                "region": data.data[0].region,
                "population": data.data[0].population,
                "flag": data.data[0].flag,
                "totalLanguages": data.data[0].languages.length,
                "totalCurrencies": data.data[0].currencies.length,
                "totalTimezones": data.data[0].timezones.length,
            })
        } catch (e) {
            if (e.response.status) {
                res.status(e.response.status).json({
                    status: e.response.status,
                    message: 'country not found'
                })
            } else {
                res.status(e.response.status).json({
                    status: e.response.status,
                    message: e.response.statusText
                })
            }
        }
    } else if (country.length <= 3 && country.length >= 2) {
        url = 'https://restcountries.eu/rest/v2/alpha/' + country
        try {
            var data = await axios({
                url: url,
                method: 'get',
            })
            console.log(data)
            res.status(200).json({
                "name": data.data.name,

                "capital": data.data.capital,
                "region": data.data.region,
                "population": data.data.population,
                "flag": data.data.flag,
                "totalLanguages": data.data.languages.length,
                "totalCurrencies": data.data.currencies.length,
                "totalTimezones": data.data.timezones.length,
            })
        } catch (e) {
            if (e.response.status) {
                res.status(e.response.status).json({
                    status: e.response.status,
                    message: 'country not found'
                })
            } else {
                res.status(e.response.status).json({
                    status: e.response.status,
                    message: e.response.statusText
                })
            }
        }
    } else {
        try {
            var data = await axios({
                url: url,
                method: 'get',
            })
            console.log(data.data)
            res.status(200).json({
                "name": data.data[0].name,

                "capital": data.data[0].capital,
                "region": data.data[0].region,
                "population": data.data[0].population,
                "flag": data.data[0].flag,
                "totalLanguages": data.data[0].languages.length,
                "totalCurrencies": data.data[0].currencies.length,
                "totalTimezones": data.data[0].timezones.length,
            })
        } catch (e) {
            try {
                var data = await axios({

                    url: '   https://restcountries.eu/rest/v2/capital/' + country,
                    method: 'get',

                })
                res.status(200).json({
                    "name": data.data[0].name,

                    "capital": data.data[0].capital,
                    "region": data.data[0].region,
                    "population": data.data[0].population,
                    "flag": data.data[0].flag,
                    "totalLanguages": data.data[0].languages.length,
                    "totalCurrencies": data.data[0].currencies.length,
                    "totalTimezones": data.data[0].timezones.length,
                })
            } catch (e) {
                if (e.response.status) {
                    res.status(e.response.status).json({
                        status: e.response.status,
                        message: 'country not found'
                    })
                } else {
                    res.status(e.response.status).json({
                        status: e.response.status,
                        message: e.response.statusText
                    })
                }
            }
        }
    }
})

module.exports = router;