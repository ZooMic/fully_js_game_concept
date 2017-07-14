let mapData = require('../app/mock/map1');

module.exports = (router, users) => {
    router.get('/current_app_state', (req, res) => {
        let hash = req.cookies.cmiyc;
        let user = users[hash];
        res.status(200).json({
            user,
            mapData,
        });
    });

    router.post('/user-restore-answer', (req, res) =>{
        let answer = req.body.answer;
        let user = users[req.cookies.cmiyc];
        if(user) {
            if(answer === 'No') {
                delete users[req.cookies.cmiyc];
            } else {
                user.disconnect = false;
            }
            res.status(200).json({});
        } else {
            res.status(401).json({msg: 'Some wird error at user-restore-answer route'});
        }
    });
};