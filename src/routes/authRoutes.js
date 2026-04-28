import express from 'express';
import { logInHandler, signUpHandler } from '../controllers/authController.js';
import { validateSignUp, validateLogIn } from '../middleware/authValidators.js';
import { logInLimiter } from '../middleware/rateLimiter.js';
const router = express.Router();

//handler for sign up route
router.post('/signup', validateSignUp, signUpHandler);
//handler for log in route
router.post('/login', validateLogIn, logInLimiter, logInHandler);

export default router;
