import {Router} from 'express'
import { googleLoginHandler, loginHandler, registerHandler } from '../controllers/auth.controller.js';


const authRoute = Router()

authRoute.post('/register', registerHandler)
authRoute.post('/login', loginHandler)
authRoute.post('/google/login', googleLoginHandler);

export default authRoute;