import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import createHttpError from "http-errors"
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'
import prisma from "../config/prisma.js"
import { getUserBy } from '../services/user.service.js'


export const register = async (req, res, next) => {
 const {email, firstName, lastName, password, mobile} = req.body
 console.log('req.body', req.body)

 
// validation 
const user = registerSchema.parse(req.body)

 
 
   // find user for non-duplicate
 const haveUser = await getUserBy({email})
 console.log('haveUser', haveUser
 )
 if(haveUser) {
   return next(createHttpError[409]('This user already register')) }

 const newUser = {
  email : email,
  password : await bcrypt.hash(password, 10),
  firstName : firstName,
  lastName : lastName,
  mobile : mobile  
}
   
 const result = await prisma.user.create({data : newUser})
 res.json({
   msg : 'Register Successful',
   result : result
  }) }



export const login = async (req,res,next) => {
  const {email, password } = req.body
  const user = loginSchema.parse(req.body) 
  const foundUser = await getUserBy({email : user.email})
  
  console.log('foundUser loginSchema', foundUser)
  
  //check user
  if(!foundUser) { return next(createHttpError[401]('Invalid Login')) }

  //check password
  let pwOk = await bcrypt.compare(password, foundUser.password)
  if(!pwOk) { 
    return next(createHttpError[401]('Invalid Login'))  
  }

 const payload = {id : foundUser.id }
 const token = jwt.sign(payload, process.env.JWT_SECRET, {
  algorithm: 'HS256',
  expiresIn: '15d'
 })
 const { password : pw, createdAt, updatedAt, ...userData} = foundUser
 res.json({
  msg: 'Login Successful',
  token: token,
  user : userData
 })

}