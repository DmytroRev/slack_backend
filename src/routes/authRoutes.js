import express from 'express';
import {
    loginWithGoogle,
    googleCallback,
    getProfile
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/middleware.js';


const router = express.Router();

router.get('/auth/google', loginWithGoogle);

router.get('/auth/google/callback', googleCallback);

router.get('/profile', isAuthenticated, getProfile);

export default router;
