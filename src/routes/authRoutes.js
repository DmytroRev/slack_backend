import express from "express";
import {
  loginWithGoogle,
  // googleCallback,
  loginWithGithub,
  githubCallback,
  getProfileGoogle,
} from "../controllers/authController.js";
import {isAuthenticatedGoogle} from '../middleware/middleware.js';
import passport from "passport";

const router = express.Router();

router.get("/auth/google", loginWithGoogle);

router.get(
  "/auth/google/callback",
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Перенаправляем на главную страницу
  }
);
router.get("/profileGoogle", isAuthenticatedGoogle, getProfileGoogle);



router.get("/auth/github", loginWithGithub);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }), // редирект на логин при провале
  githubCallback
);

export default router;
