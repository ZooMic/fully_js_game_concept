import $ from 'jquery';
import {connectSocketIo} from './connection';
import {run} from './logic';

var gameState = {
    keyboard: [],
    player: '',
    players: [],
    canvas: {
        size: {
            width: 650,
            height: 650,
        },
    },
};

const init = (data) => {
    setKeyboardHandling();
    prepereCanvas();
    connectSocketIo(gameState);
    gameState.data = data; // TODO - clean this stuff, probably redundant information
    gameState.player = data.user;
    run(gameState);
};

const setKeyboardHandling = () => {
    $('#my-canvas').on('keydown', function (event){
        let key = event.key.toLowerCase();
        if(gameState.keyboard.indexOf(key) < 0) gameState.keyboard.push(key);
    });

    $('#my-canvas').on('keyup', function (event){
        let key = event.key.toLowerCase();
        let position = gameState.keyboard.indexOf(key);
        if(position >= 0) gameState.keyboard.splice(position, 1);
    });
};

const prepereCanvas = () => {
    let canvas = $('#my-canvas');
    gameState.canvas.entity = document.getElementById('my-canvas');
    canvas.attr('width', window.innerWidth);
    canvas.attr('height', window.innerHeight);
    gameState.canvas.size.width = window.innerWidth;
    gameState.canvas.size.height = window.innerHeight;

    $(window).resize(() => {
        let canvas = $('#my-canvas');
        if(canvas) {
            canvas.attr('width', window.innerWidth);
            canvas.attr('height', window.innerHeight);
            gameState.canvas.size.width = window.innerWidth;
            gameState.canvas.size.height = window.innerHeight;
        }
    });
    // canvas.attr('width', gameState.canvas.size.width);
    // canvas.attr('height',gameState.canvas.size.height);
};

module.exports = {
    init,
};
