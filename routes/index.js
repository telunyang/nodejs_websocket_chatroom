var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', { title: 'Websocket chatroom exhibition with [Express web server]' });
});

module.exports = router;
