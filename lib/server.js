var express = require('express');

var config  = require('./../config/config');

module.exports = {

  start: function() {
    var app    = express();
    var server = require('http').Server(app);

    app.use(express.static(path.join(__dirname, '..', 'public')));

    server.listen(config.port);
  }

};
