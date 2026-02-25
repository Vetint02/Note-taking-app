import passport from "../config/passport.js"

// I had AI help me create this logic to have it on separate file
export const loginUser = (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: '/notes', // Redirecting to show notes when authentication is successful
    failureRedirect: '/', // Redirecting to main page when authentication is unsuccessful
    })(req, res, next);
};

export const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

export function ensureAuthentication(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/');
    }
};