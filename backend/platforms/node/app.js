var express = require('express')
var app = express()
var router = require('./routes')

app.use('/api/nodejs/v1', router);

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});