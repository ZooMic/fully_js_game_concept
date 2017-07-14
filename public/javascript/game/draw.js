



const drawMap = (gameState, ctx) => {
    let elements = gameState.data.mapData.terrain.elements,
        elSize = gameState.data.mapData.terrain.elementsSize,
        map = gameState.data.mapData.terrain.map,
        center = gameState.player.position,
        canvasSize = gameState.canvas.size;

    // find shift of the map, and check wheter any of its corners fits to 0 to 600 size 

    let shift = {
        x: center.x - (canvasSize.width / 2),
        y: center.y - (canvasSize.height / 2),
    };
    let cellX, cellY, posX, posY;

    for(let i = 0; i < map.length; i++) {
        cellY = i * elSize.height;
        posY = cellY - shift.y;
        if(posY + elSize.height >= 0 || posY < canvasSize.height) {
            for(let j = 0; j < map[i].length; j++) {
                cellX = j * elSize.width;
                posX = cellX - shift.x;
                if(posX + elSize.width >= 0 || posX < canvasSize.width) {
                    ctx.beginPath();
                    ctx.rect(posX < 0 ? 0 : posX, posY < 0 ? 0 : posY, elSize.width + 1, elSize.height + 1);
                    ctx.fillStyle = elements[map[i][j]].color;
                    ctx.fill();
                }
            }
        }
    }
};

const drawPlayer = (gameState, player, ctx) => {
    let center = gameState.player.position,
        canvasSize = gameState.canvas.size,
        shift = {
            x: center.x - (canvasSize.width / 2),
            y: center.y - (canvasSize.height / 2),
        };
    let posX = player.position.x - shift.x,
        posY = player.position.y - shift.y;

    if(posX >= 0 && posX < canvasSize.width && posY >= 0 && posY < canvasSize.height) {
        ctx.beginPath();
        ctx.arc(posX, posY, player.radius, 0, 2 * Math.PI);
        let teamColor;
        if(player.disconnect) {
            teamColor = '#a9a9a9';
        } else {
            teamColor = gameState.data.mapData.teams[player.team].color;
        }
        ctx.fillStyle = teamColor;
        ctx.fill();

        let x = Math.sin(player.angle * Math.PI / 180);
        let y = Math.cos(player.angle * Math.PI / 180);
        ctx.beginPath();
        ctx.arc(posX + player.radius * x, posY + player.radius * y, player.radius / 3, 0, 2 * Math.PI);
        ctx.fillStyle = player.headColor;
        ctx.fill();

        ctx.font = '15px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = teamColor;
        ctx.fillText(player.username, posX, posY - player.radius - 5);
    }
};

const drawPlayers = (gameState, ctx) => {
    let username = gameState.player.username;
    gameState.players.forEach(player => {
        if(username != player.username) {
            drawPlayer(gameState, player, ctx);
        }
    });
};

const draw = (gameState) => {
    let canvas = gameState.canvas.entity;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap(gameState, ctx);
    drawPlayer(gameState, gameState.player, ctx);
    drawPlayers(gameState, ctx);
    //console.log(gameState.players);
};

module.exports = {
    draw,
};
