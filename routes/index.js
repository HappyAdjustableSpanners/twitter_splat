var express = require('express');
var router = express.Router();

var Twit = require('twit');

router.get('/tweets', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    var T = new Twit({
            consumer_key: 'Xw1qsOqbjUZki4KdrxxA1KDae',
            consumer_secret: 'q5zn81G2jeBUi4S7BUCjl0KmSCMeT5NmqQF1vQM4aSbzs6GOB4',
            access_token: '345567866-mKagPF3UFpd1BK8JsSWKAvIAJWQkyY6HLsnNLhpc',
            access_token_secret: 'zOfQp2bBUgBOZpdib8JAxYg1wr3kbcvihSaWPYnbw2fec'
    });

    var options = { screen_name: req.query.handle,
    count: req.query.count };

    console.log(options);

    T.get('statuses/user_timeline', options , gotData );

    function gotData(err, data, response) {
        // declare list of objects
        let objs = [];

        for(let i = 0; i < data.length; i++)
        {
            let obj = {
                handle: data[i].user.name,
                text: data[i].text,
                img: data[i].user.profile_image_url,
            }

            objs.push(obj);
        }

        res.json(objs);
        console.log(objs);


        //Return only the attributes we want
    }

});

module.exports = router;