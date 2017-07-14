var map = require('./mock/map1');
var socketConnection = require('./socket_connection');

module.exports = (io) => {
    let data = {
        users: [],
        map,
    };
    socketConnection(io, data);
    return data;
};