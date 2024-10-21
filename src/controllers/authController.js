import passport from "passport";

export const loginWithGoogle = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const googleCallback = (req, res) => {
    res.redirect('/profile');
};

export const getProfile= (req, res) => {
    if(req.isAuthenticated()) {
        res.send(`Hello, ${req.user.displayName}`);
    } else {
        res.redirect("/auth/google");
    }
};
