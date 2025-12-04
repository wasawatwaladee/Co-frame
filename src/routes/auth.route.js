import {Router} from 'express'
import { getUserByUsername, googleLoginHandler, loginHandler, profileUser, registerHandler, updateProfile } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.Middleware.js';


const authRoute = Router()

authRoute.post('/register', registerHandler)
authRoute.post('/login', loginHandler)
authRoute.post('/google/login', googleLoginHandler);
authRoute.get('/me',authMiddleware , profileUser)
authRoute.put('/me', authMiddleware, updateProfile)
authRoute.get('/me/:username', getUserByUsername)

export default authRoute;