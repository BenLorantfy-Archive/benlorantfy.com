var express = require('express')
var app = express()
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed 
var config = require('../config.json');
var router = express.Router();
app.use('/api/nodejs/v1', router);

router.get('/', function (req, res) {
  res.send('Hello World from the node API!')
})

router.get('/articles', function (req, res) {
    var feedrequest = request(config.blog.url);
    var feedparser = new FeedParser();
    var sent = false;
    
    feedrequest.on('error', function (error) {
        console.log("request error");
        console.log(error);
        if(!sent) res.end(500);
        sent = true;
    });
    
    feedrequest.on('response', function (res) {
        var stream = this; // `this` is `feedrequest`, which is a stream 
        
        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'));
        }
        else {
            stream.pipe(feedparser);
        }
    });
    
    feedparser.on('error', function (error) {
        console.log("parse error");
        console.log(error);
        if(!sent) res.end(500);
        sent = true;
    });
    
    var posts = [];
    feedparser.on('readable', function () {
        // This is where the action is! 
        var stream = this; // `this` is `feedparser`, which is a stream 
        var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
        var item;
        
        while (item = stream.read()) {
            posts.push({
                 title: item.title
                ,description: item.description
                ,link: item.link
            });
        }

        if(!sent) res.json(posts);
        sent = true;
    });
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});