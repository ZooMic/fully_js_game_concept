module.exports = (io, data) => {
    io.use((socket, next) => {
        let cookie = socket.handshake.query.cmiyc;
        let user = data.users[cookie];
        
        if(user) {
            next();
        } else {
            socket.emit('err', {
                msg: 'Authentication error',
            });
        }
    });

    io.on('connection', socket => {
        let cookie = socket.handshake.query.cmiyc;
        let user = data.users[cookie];

        socket.on('disconnect', () => {
            user.disconnect = true; 
        });

        socket.on('game_diff', (data) => {
            user.position = data.position;
            user.angle = data.angle;
        });

        let users;
        setInterval(()=>{
            users = [];
            for(let key in data.users) {
                users.push({
                    position: data.users[key].position,
                    username: data.users[key].username,
                    angle: data.users[key].angle,
                    radius: data.users[key].radius,
                    team: data.users[key].team,
                    disconnect: data.users[key].disconnect,
                    headColor: data.users[key].headColor,
                });
            }
            socket.emit('game_state', {users});
        }, 1000/60);
    });

   

};