import passport from "passport";

export const loginWithGoogle = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const googleCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/' })(req, res, next);
};

export const getProfileGoogle = (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello, ${req.user.displayName}`);
    } else {
        res.redirect("/auth/google");
    }
};


export const loginWithGithub = passport.authenticate('github', {
    scope: ['user:email']  // GitHub scope to access the user's email
});

export const githubCallback = (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/' }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth/github');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/profileGithub');
        });
    })(req, res, next);
};

export const getProfileGithub= (req, res) => {
    if(req.isAuthenticated()) {
        res.send(`Hello, ${req.user.displayName}`);
    } else {
        res.redirect("/auth/github");
    }
};
