const   middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', "You do not have permission to do this action!");
    res.redirect('/login')
}

module.exports = middlewareObj;