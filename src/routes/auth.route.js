import {Router} from 'express'

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)

export default authRoute;