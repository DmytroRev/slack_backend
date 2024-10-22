import passport from "passport";

export const loginWithGoogle = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const googleCallback = (req, res) => {
    res.redirect('/profileGoogle');
};

export const getProfileGoogle= (req, res) => {
    if(req.isAuthenticated()) {
        res.send(`Hello, ${req.user.displayName}`);
    } else {
        res.redirect("/auth/google");
    }
};


export const loginWithGithub = passport.authenticate('github', {
    scope: ['profile', 'email']
});

export const githubCallback = (req, res) => {
    res.redirect('/profileGit');
};

export const getProfileGithub= (req, res) => {
    if(req.isAuthenticated()) {
        res.send(`Hello, ${req.user.displayName}`);
    } else {
        res.redirect("/auth/github");
    }
};
