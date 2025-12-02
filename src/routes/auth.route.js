import {Router} from 'express'
import { login, profileUser, register } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.Middleware.js';


const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.get('/me',authMiddleware , profileUser)
export default authRoute;