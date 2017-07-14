var jwt = require('jsonwebtoken');
var config = require('../config');
var users = [];

const ioConnection = (io) => {
    // middleware
    io.use((socket, next)=>{
        let token = socket.handshake.query.token;
        try {
            jwt.verify(token, config.jwtSecret);
            next();
        } catch (err) {
            socket.emit('error', {state: "Authentication error"});
        }
    });
    io.on('connection', function(socket) {
    // new_connection / new_user
        let token = jwt.verify(socket.handshake.query.token, config.jwtSecret);
        let user = users.find((u)=>{
            return u.username === token.username;
        });
        user = user || createNewUser(token.username);
        user.connected = true;
        let data = {
            cmiyc: {
                size: {
                    width: config.cmiyc.mapSize.width,
                    height: config.cmiyc.mapSize.height,
                },
            },
            user,
        }
        socket.emit('initial_data', data);
        users.push(user);

    // listen for user concrete user to disconnect
        socket.on('disconnect', function(socket) {
          console.log('user', token.username, ' disconnected');
          let index = users.findIndex(u=>{
             return u.username === token.username;
          });
          if(index >= 0) {
              users[index].connected = false;
          }
        });
        // listener for one player state and moves
        socket.on('player_state', function(data){
            let index = users.findIndex(u=>{
               return u.username === data.username;
            });
            if(index >= 0) {
                users[index] = data;
            }
        });

        setInterval(()=>{
            socket.emit('players_state', users);
        }, 1000 / 60);
    });
};

function createNewUser(username) {
    const randomColor = () => {
        let color = Math.floor(Math.random() * 16777215).toString(16);
        if(color.length < 6) {
            for(let i = color.length; i < 6; i++) {
                color = '0' + color;
            }
        }
        color = "#" + color;
        return color;
    }
    let user = {
        username,
        bodyColor: randomColor(),
        headColor: randomColor(),
        position: {
            x: Math.floor(Math.random() * config.cmiyc.mapSize.width),
            y: Math.floor(Math.random() * config.cmiyc.mapSize.height),
        },
        angle: Math.floor(Math.random() * 359),
        radius: config.cmiyc.playerRadius,
        lastMoves: [],
        speed: 0,
    }
    return user;
}

module.exports = ioConnection;
