module.exports = (router, data) => {
    let users = data.users;

    const generateHashString = (length) => {
        let hash = '',
            rand; 
        for(let i = 0; i < length; i++) {
            rand = Math.floor(Math.random() * 16).toString(16);
            if(Math.floor(Math.random() * 2) === 1) rand =  rand.toUpperCase();
            else rand = rand.toLowerCase();
            hash = hash + rand;
        }
        return hash;
    };

    const getRandomColor = () => {
        let rand = Math.floor(Math.random() * 16777216).toString(16);
        for(let i = rand.length; i < 6; i++) {
            rand = '0' + rand;
        }
        rand = '#' + rand;
        return rand;
    };

    const createPlayer = (username) => {
        let team1 = 0, usersLength = 0;
        for(let key in users) {
            usersLength++;
            if(users[key].team === 0) {
                team1++;
            }
        }
        let team;
        if(team1 > Math.floor(usersLength / 2)) team = 1;
        else if(team1 < Math.floor(usersLength / 2)) team = 0;
        else team = Math.floor(Math.random() * 2);
       
        // TODO - make this better, because player will born on each other and in one place, make respowns array
        // and it should be looked by property ID not the ID in array
        let respawns = data.map.respawns[team];
        
        let user = {
            username,
            team,
            headColor: getRandomColor(),
            position: {
                x: respawns.x,
                y: respawns.y,
            },
            disconnect: false,
            angle: Math.random() * 360,
            speed: 0,
            radius: data.map.playerDefaults.radius,
        };

        return user;
    };

    router.post('/login', function(req, res) {
        let username = req.body.username;
        let exist = false;
        for(let key in users) {
            if(users[key].username === username) {
                exist = true;
            }
        }
        if(!exist) {
            let hash = generateHashString(64);
            users[hash] = createPlayer(username);
            res.cookie('cmiyc', hash, {
                maxAge: 90000,
            });
            res.status(200).json({});
        } else {
            res.status(401).json({
                msg: 'This username exist, pick something else.',
            });
        }
    });
};