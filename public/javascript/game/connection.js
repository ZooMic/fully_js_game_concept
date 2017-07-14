import io from 'socket.io-client';

const url = () => {
    var href = window.location.href.split('/');
    return href[0] + '//' + href[2] + '?' + document.cookie;
};

const connectSocketIo = (appState) => {
    let socket = io.connect(url());

    socket.on('game_state', (data) => { 
        appState.players = data.users;
    });

    socket.on('err', data => {
        alert('Error msg' + data.msg);
    });

    setInterval(() => {
        socket.emit('game_diff', {
            position: appState.player.position,
            angle: appState.player.angle,
        });
    }, 1000 / 60);
};

module.exports = {
    connectSocketIo,
};
