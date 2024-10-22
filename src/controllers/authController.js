import passport from "passport";

export const loginWithGoogle = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

export const googleCallback = (req, res) => {
    res.redirect('/');
};

export const getProfileGoogle = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.redirect("/auth/google");
    }
};


export const loginWithGithub = passport.authenticate('github', {
    scope: ['profile', 'email']
});

export const githubCallback = (req, res) => {
    res.redirect('/');
};

export const getProfileGithub= (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.redirect("/auth/github");
    }
};
