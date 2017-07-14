import {draw} from './draw';

const checkWallColision = (gameState, player) => {
    let w = gameState.data.mapData.size.width;
    let h = gameState.data.mapData.size.height;
    let x = player.position.x;
    let y = player.position.y;

    if(x > w - player.radius) {
        player.position.x = w - player.radius;
    }
    if(x < 0 + player.radius) {
        player.position.x = player.radius;
    }
    if(y > h - player.radius) {
        player.position.y = h - player.radius;
    }
    if(y < 0 + player.radius) {
        player.position.y = player.radius;
    }
};

const movePlayer = (gameState) => {
    let keys = gameState.keyboard;
    let player = gameState.player;
    // setting counter, because every move is cout with this time delay ratio
    if(!player.lastMoveTime) {
        player.lastMoveTime = (new Date()).getTime();
    }
    let timeRatio = ((new Date).getTime() - player.lastMoveTime) / 1000;

    // if speed key is not pressed (arrow down, arrow up) than it stops itself
    let speedKeyPressed = false;
    keys.forEach(key=>{
        switch(key) {
            case 'arrowdown': {
                player.speed -= 1000 * timeRatio;
                if(player.speed < -80) player.speed = -80 ;
                speedKeyPressed = true;
                break;
            }
            case 'arrowup': {
                player.speed += 1000 * timeRatio;
                if(player.speed > 360) player.speed = 180 ;
                speedKeyPressed = true;
                break;
            }
            case 'arrowleft': {
                player.angle += 180 * timeRatio;
                if(player.angle <= -1) player.angle = player.angle + 360;
                if(player.angle >= 360) player.angle = player.angle - 360;
                break;
            }
            case 'arrowright': {
                player.angle -= 180 * timeRatio;
                if(player.angle <= -1) player.angle = player.angle + 360;
                if(player.angle >= 360) player.angle = player.angle - 360;
                break;
            }
        }
    });
    if(!speedKeyPressed) {
        if(player.speed < 0) {
            player.speed += 1000 * timeRatio;
            if(player.speed > 0) player.speed = 0;
        }
        if(player.speed > 0) {
            player.speed -= 1000 * timeRatio;
            if(player.speed < 0) player.speed = 0;
        }
    }

    // interprete angle and speed
    let x = Math.sin(player.angle * Math.PI / 180);
    let y = Math.cos(player.angle * Math.PI / 180);

    player.position.x += x * player.speed * timeRatio;
    player.position.y += y * player.speed * timeRatio;

    checkWallColision(gameState, player);

    player.lastMoveTime = (new Date).getTime();
};

const run = (gameState) => {
    console.log(gameState);
    setInterval(()=>{
        movePlayer(gameState);
        draw(gameState);
    }, 1000 / 60);
    //console.log('RUN GAME!', gameState);
};

module.exports = {
    run,
};
