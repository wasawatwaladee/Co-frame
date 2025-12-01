import bcrypt from 'bcryptjs'; 
import jsonwebtoken from 'jsonwebtoken'; // 🟢 แก้ไขการนำเข้าให้สอดคล้องกับ jsonwebtoken.sign
import createHttpError from "http-errors"; 
import { loginSchema, registerSchema } from '../schemas/auth.schema.js' 
import { OAuth2Client } from 'google-auth-library';
// 🟢 นำเข้าฟังก์ชัน Service Layer
import { getUserBy, createUser } from '../services/user.service.js'; 
import prisma from "../config/prisma.js" 
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'PLEASE_SET_A_VERY_SECURE_SECRET_IN_YOUR_ENV_FILE';

let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
if (GOOGLE_CLIENT_ID) {
    GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID.trim().replace(/['";]/g, '');
} else {
    console.error("GOOGLE_CLIENT_ID is missing.");
}


//Client สำหรับตรวจสอบ Token
const client = new OAuth2Client(GOOGLE_CLIENT_ID); 


/**
 * 🟢 Express Handler สำหรับ Google Login (ใช้ ID Token)
 */
export const googleLoginHandler = async (req, res, next) => {
    const idToken = req.body.idToken; 

    if (!idToken) {
        return res.status(400).json({ message: 'Missing ID Token' });
    }
    if (!client || !GOOGLE_CLIENT_ID) {
        return res.status(500).json({ message: 'Server config error: Google client ID missing.' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: GOOGLE_CLIENT_ID, 
        });

        const payload = ticket.getPayload();
        
        const googleId = payload['sub'];       
        const email = payload.email;
        const name = payload.name;
        const picture = payload.picture || null;
        
        if (!payload.email_verified) {
             return res.status(401).json({ message: 'Google email is not verified' });
        }

        // 1. ค้นหาผู้ใช้ด้วย Google ID
        let user = await getUserBy({ googleID: googleId }); 

        if (!user) {
            // 2. ถ้าไม่พบ ให้สร้างบัญชีใหม่
            user = await createUser({
                googleID: googleId,
                email: email,
                name: name,
                picture: picture, 
            });
            console.log(`[PRISMA] Created new Google user: ${email}`);
        } else {
             console.log(`[PRISMA] Found existing user: ${email}`);
        }

        // 3. สร้าง App JWT Token
        const appToken = jsonwebtoken.sign( 
            { id: user.id, email: user.email, role: user.role, googleID: user.googleID }, 
            JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            message: 'Google login successful with ID Token', 
            token: appToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                googleID: user.googleID, 
                picture: user.picture
            }
        });

    } catch (error) {
        // ข้อผิดพลาดจากการยืนยัน Token
        console.error("--- TOKEN VERIFICATION FAILED (401) ---");
        console.error("Error message:", error.message);
        console.error("Client ID used for verification:", GOOGLE_CLIENT_ID); 
        console.error("---------------------------------------");
        res.status(401).json({ message: 'Invalid or expired Google ID Token' });
    }
}


/**
 * 🔵 Express Handler สำหรับ Register (Email/Password)
 */
export const registerHandler = async (req, res, next) => { // เปลี่ยนชื่อ export เป็น registerHandler
    const {email, firstName, lastName, password, mobile} = req.body
    
    // validation
    const user = registerSchema.parse(req.body) 
    
    // 1. ตรวจสอบว่ามีผู้ใช้อยู่แล้วหรือไม่
    const haveUser = await getUserBy({ email: email }); 
    
    if(haveUser) {
        return next(createHttpError(409, 'This user already register')) // 🟢 แก้ไข Syntax
    }

    const newUser = {
        email : email,
        password : await bcrypt.hash(password, 10),
        firstName : firstName,
        lastName : lastName,
        mobile : mobile  
    }
    
    // 2. สร้างบัญชีผู้ใช้ใน Prisma (ใช้ createUser จาก Service Layer)
    const result = await createUser(newUser)
    res.json({
        msg : 'Register Successful',
        result : result
    }) 
}


/**
 * 🔵 Express Handler สำหรับ Login (Email/Password)
 */
export const loginHandler = async (req,res,next) => { // เปลี่ยนชื่อ export เป็น loginHandler
    const {email, password } = req.body
    const user = loginSchema.parse(req.body) 
    
    // 1. ค้นหาผู้ใช้
    const foundUser = await getUserBy({email : email}); 
    
    //check user
    if(!foundUser) { return next(createHttpError(401, 'Invalid Login')) } // 🟢 แก้ไข Syntax

    //check password
    let pwOk = await bcrypt.compare(password, foundUser.password)
    if(!pwOk) { 
        return next(createHttpError(401, 'Invalid Login'))  // 🟢 แก้ไข Syntax
    }

    const payload = {id : foundUser.id }
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { // 🟢 ใช้ jsonwebtoken.sign
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