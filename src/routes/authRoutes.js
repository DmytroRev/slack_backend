import express from "express";
import {
  loginWithGoogle,
  googleCallback,
  getProfileGoogle,
  loginWithGithub,
  githubCallback,
  getProfileGithub,
} from "../controllers/authController.js";
import {isAuthenticatedGithub, isAuthenticatedGoogle } from "../middleware/middleware.js";


const router = express.Router();

router.get("/auth/google", loginWithGoogle);

router.get("/auth/google/callback", googleCallback);

router.get("/profileGoogle", isAuthenticatedGoogle, getProfileGoogle);


router.get("/auth/github", (req, res, next) => {
  console.log('GitHub auth initiated');
  next();
}, loginWithGithub);

router.get("/auth/github/callback", githubCallback);

router.get("/profileGithub", isAuthenticatedGithub, getProfileGithub);

export default router;
