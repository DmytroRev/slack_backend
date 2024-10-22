import dotenv from "dotenv";
import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis'; // Импортируем RedisStore
import redis from 'redis';
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2"; // Импортируйте GitHubStrategy
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('src'));

const redisClient = redis.createClient();

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://slack-auth-q31c.onrender.com/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'https://slack-auth-q31c.onrender.com/auth/github/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('GitHub Profile:', profile);
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Используйте роуты
app.use('/', authRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
