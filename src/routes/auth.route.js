import {Router} from 'express'
import { deleteUser, getAllUsersController, getUserByUsername, googleLoginHandler, loginHandler, profileUser, registerHandler, updateProfile, updateUserRole } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.Middleware.js';
import { auth } from 'google-auth-library';


const authRoute = Router()

authRoute.post('/register', registerHandler)
authRoute.post('/login', loginHandler)
authRoute.post('/google/login', googleLoginHandler);
authRoute.get('/me',authMiddleware , profileUser)
authRoute.put('/me', authMiddleware, updateProfile)
authRoute.get('/me/:username', getUserByUsername)
authRoute.get('/users', authMiddleware, getAllUsersController)
authRoute.put('/users/:id', authMiddleware,updateUserRole )
authRoute.delete('/users/:id', authMiddleware,deleteUser)

export default authRoute;