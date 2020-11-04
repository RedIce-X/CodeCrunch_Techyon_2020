const express = require("express"),
    router = express.Router();
const axios = require('axios');

const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAN4MHQEAAAAAZpvpgeO08HS4m9BTBof6klQqlA0%3DVAUtSQIJT29FctKyAeIC0BfipMIHdOLWJbNSkRPparHevBnDos`
    }
}

// TASK 9
router.get('/twitter/user/:user_name', (req, res) => {
    axios.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${req.params.user_name}&count=10`, config).then(response => {
            let user = response.data[0].user;
            let data = response.data;
            let recentTweets = [];
            let count = 0;
            data.forEach(element => {
                recentTweets.push({
                    'created_at': element.created_at,
                    'text': element.text
                });
            });
            return res.status(200).json({
                'user_name': user.name,
                'User_screen_name': user.screen_name,
                'followers_count': user.followers_count,
                'friends_count': user.friends_count,
                'tweets': recentTweets
            });
        })
        .catch(err => {
            return res.status(404).json({
                'message': "tweets not found"
            })
        });
});

// TASK 10
router.get('/twitter/hashtag/:hashtag', (req, res) => {
    axios.get(`https://api.twitter.com/2/tweets/search/recent?query=%23${req.params.hashtag}&max_results=10&expansions=author_id&tweet.fields=public_metrics`, config).then(response => {
        let data = response.data.data;
        let promises = [];
        let properData = [];
        data.forEach(element => {
            promises.push(
                axios.get(`https://api.twitter.com/2/users/${element.author_id}`, config).then(response => properData.push({
                    'text': element.text,
                    'user_screen_name': response.data.data.username,
                    'retweet_count': element.public_metrics.retweet_count
                }))
            )
        });
        Promise.all(promises).then(() => {
            return res.status(200).json({
                "tweets": properData
            })
        });
    }).catch(err => {
        return res.status(404).json({
            'message': "tweets not found",
        })
    })
});

// TASK 11
router.get('/twitter/location', (req, res) => {
    axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=%20&geocode=${req.query.lattitude},${req.query.longitude},${req.query.radius}km&count=10`, config)
        .then(response => {
            let recentTweets = [];
            let count = 0;
            response.data.statuses.forEach(element => {
                recentTweets.push({
                    'text': element.text,
                    'user_screen_name': element.user.screen_name,
                });
            });
            return res.status(200).json({
                'Tweets': recentTweets
            });
        }).catch(err => {
            return res.status(404).json({
                "message": "tweets not found"
            });
        });
})

module.exports = router;