import {Router} from 'express'
import { googleLoginHandler, loginHandler, registerHandler } from '../controllers/auth.controller.js';
import { getUserByUsername, login, profileUser, register, updateProfile } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.Middleware.js';


const authRoute = Router()

authRoute.post('/register', registerHandler)
authRoute.post('/login', loginHandler)
authRoute.post('/google/login', googleLoginHandler);
authRoute.get('/me',authMiddleware , profileUser)
authRoute.put('/me', authMiddleware, updateProfile)
authRoute.get('/me/:username', getUserByUsername)

export default authRoute;