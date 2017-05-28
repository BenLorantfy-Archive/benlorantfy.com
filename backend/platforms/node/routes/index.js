var express = require('express')
var app = express()
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed 
var config = require('../../../config.json');
var router = express.Router();
var copy = {
     projects: require("../../../copy/projects.json")
    ,experience: require("../../../copy/experience.json")
    ,education: require("../../../copy/education.json")
    ,awards: require("../../../copy/awards.json")
}

router.get('/', function (req, res) {
  res.send('Hello World from the node API!')
})

/**
 * @api {get} /experience Request experience information
 * @apiName GetExperience
 * @apiGroup Experience
 *
 * @apiSuccess {Object[]} items List of experience items (Array of Objects).
 * @apiSuccess {string} items.company Name of the company I worked for.
 * @apiSuccess {string} items.title My job title at the company.
 * 
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 OK
 *     {
 *       "items": [
 *          {
 *              "company": "Postmedia",
 *              "title": "Front End Developer"
 *          }
 *       ]
 *     }
 */
router.get('/experience', function (req, res) {
    res.json(copy.experience);
});

/**
 * @api {get} /experience Request education information
 * @apiName GetEducation
 * @apiGroup Education
 *
 * @apiSuccess {Object[]} items List of education items (Array of Objects).
 * @apiSuccess {string} items.school The school I went to
 * @apiSuccess {string} items.program The program at the school I enrolled in
 * @apiSuccess {string} items.program Description of the program
 * @apiSuccess {string} items.logo A url to the school logo
 * 
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 OK
 *     {
 *       "items": [
 *          {
 *              "school": "Conestoga College",
 *              "program": "Software Engineering Technology",
 *              "description": "The software engineering technology program at Conestoga College is widely recognized as one of the top programs of its kind in the province",
 *              "logo": "https://res.cloudinary.com/dnefq4yix/image/upload/v1495385325/dc1b5860-19d5-406c-86f2-0a307bf0b78b_bninxu.png"
 *          }
 *       ]
 *     }
 */
router.get('/education', function (req, res) {
    res.json(copy.education);
});

/**
 * @api {get} /experience Request awards information
 * @apiName GetAwards
 * @apiGroup Awards
 *
 * @apiSuccess {Object[]} items List of awards I've won (Array of Objects).
 * @apiSuccess {string} items.name The name of the award
 * @apiSuccess {string} items.organization The organization that presented the award
 * @apiSuccess {string} items.description Description of the award
 * @apiSuccess {string} items.logo A url to the organization logo
 * @apiSuccess {string} items.descriptionImage A secondary image that is relevant to the description of the award
 * 
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 OK
 *     {
 *       "items": [
 *          {
 *              "name": "Web Development - 1st Place",
 *              "organization": "Skills Canada",
 *              "description": "I won 1st place competing at the national Skills Canada web development compeition in 2015",
 *              "logo": "https://res.cloudinary.com/dnefq4yix/image/upload/v1495386212/SkillsCanadaLarge_y4amsg.png".
 *              "descriptionImage": "https://res.cloudinary.com/dnefq4yix/image/upload/v1495386835/11119004_969462426427330_4301582679536313786_o_psegiy.jpg"
 *          }
 *       ]
 *     }
 */
router.get('/awards', function (req, res) {
    res.json(copy.awards);
});

/**
 * @api {get} /experience Request projects information
 * @apiName GetProjects
 * @apiGroup Projects
 *
 * @apiSuccess {Object[]} items List of projects (Array of Objects).
 * @apiSuccess {string} items.title The title of the project
 * @apiSuccess {string} items.message A short description of the image
 * @apiSuccess {string} items.image A screenshot of the project
 * 
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 OK
 *     {
 *       "items": [
 *          {
 *              "title": "GamePod.io",
 *              "message": "GamePod.io is a web-based modern game builder that produces web games using native web technologies.",
 *              "image": "https://res.cloudinary.com/dnefq4yix/image/upload/v1495390304/Screen_Shot_2017-05-21_at_2.10.51_PM_algn7n.png",
 *          }
 *       ]
 *     }
 */
router.get('/projects', function (req, res) {
    res.json(copy.projects);
});

/**
 * @api {get} /articles Request articles information
 * @apiName GetArticles
 * @apiGroup Articles
 *
 * @apiSuccess {Object[]} items List of blog articles I've written on medium (Array of Objects).
 * @apiSuccess {string} items.title The title of the article
 * @apiSuccess {string} items.message A snippet of the article
 * @apiSuccess {string} items.link A link to the article on medium
 * 
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 OK
 *     {
 *       "items": [
 *          {
 *              "title": "Test Post",
 *              "description": "<p>Testing RSS feed</p><img src=\"https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=19d4ddf00b06\" width=\"1\" height=\"1\">",
 *              "link": "https://medium.com/@benlorantfy/test-post-19d4ddf00b06?source=rss-d76e39cd8b1------2",
 *          }
 *       ]
 *     }
 */
router.get('/articles', function (req, res) {
    var feedrequest = request(config.blog.url);
    var feedparser = new FeedParser();
    var sent = false;
    
    feedrequest.on('error', function (error) {
        console.log("request error");
        console.log(error);
        if(!sent) { res.status(500); res.end("error") }
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
        if(!sent) { res.status(500); res.end("error") }
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


module.exports = router;