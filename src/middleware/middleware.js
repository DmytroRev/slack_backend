export const isAuthenticatedGoogle = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/google');
};
export const isAuthenticatedGithub = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/github');
};
