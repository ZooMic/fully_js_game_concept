module.exports = (router, users) => {

    // unless helper function to exclude paths from authentication
    const unless = (path, middleware) => {
        return function(req, res, next) {
            if(path === req.path) return next();
            else return middleware(req, res, next); 
        };
    };
    
    router.use(unless('/login', function(req, res, next) {
        
        let user = '', cookie = '';
        if(req.cookies) {
            cookie = req.cookies.cmiyc;
            if(cookie) {
                user = users[cookie];
            }
        }
        
        if(!user) {
            res.status(401).json({
                msg: '',
            });
        } else {
            next();
        }
        
    }));
};