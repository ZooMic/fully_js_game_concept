var express = require('express');
// var jwt = require('jsonwebtoken');
// var config = require('../config');


// created as a function to connect users session with game
module.exports = (data) => {
    let router = express.Router();

    // temporary users storage, ultimately MongoDB connection
    let users = data.users;

    let authenticationRoute = require('./authentication');
    let loginRoute = require('./login');
    let appStatesRoute = require('./app_states');

    authenticationRoute(router, users);
    loginRoute(router, data);
    appStatesRoute(router, users);

    return router;
};
