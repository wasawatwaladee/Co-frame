import {Router} from 'express'
import { getUserByUsername, login, profileUser, register, updateProfile } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.Middleware.js';


const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.get('/me',authMiddleware , profileUser)
authRoute.put('/me', authMiddleware, updateProfile)
authRoute.get('/me/:username', getUserByUsername)

export default authRoute;