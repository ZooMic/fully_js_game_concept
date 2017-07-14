var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var server = http.createServer(app);
var port = 8080;
var router = require('./routes/index');
var cookieParser = require('cookie-parser');
var io = require('socket.io')(server);

// webpack configuration
var webpack = require('webpack');
var config = require('./webpack.config.js');
var webpackHotMidlleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');
var compiler = webpack(config);

var runGame = require('./app/run_game');
var gameData = runGame(io);

// needed middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(webpackDevMiddleware(compiler, {noInfo: true}));
app.use(webpackHotMidlleware(compiler));
app.use(express.static('public'));
app.use('/', router(gameData));

// server starts listening
server.listen(port, function(){
    /*eslint-disable */
    console.log("Server is listening at ", port);
    /*eslint-enable */
});
