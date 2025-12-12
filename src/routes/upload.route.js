// routes/upload.route.js
import express from 'express';
import multer from 'multer'; // 💡 ต้องติดตั้ง: npm install multer
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// --- Configuration Setup (To find the root directory) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..'); // ย้อนกลับไปที่ Root Project Directory (ที่ app.js อยู่)
const UPLOAD_DIR = path.join(ROOT_DIR, 'uploads');
// --------------------------------------------------------

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Multer จะบันทึกไฟล์ลงในโฟลเดอร์ uploads ที่เราสร้างไว้ใน app.js
        cb(null, UPLOAD_DIR); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
        cb(null, `post-img-${Date.now()}-${Math.round(Math.random() * 1E6)}${ext}`);
    }
});

// กำหนดการตั้งค่า Multer
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // จำกัดขนาดไฟล์ไม่เกิน 50 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        // ส่ง Error หากไฟล์ไม่ใช่รูปภาพ
        cb(new Error("Only images (jpeg, jpg, png, gif) are allowed"));
    }
});

// 💡 จำลอง Middleware ตรวจสอบสิทธิ์ (กรุณาแทนที่ด้วย Middleware จริงของคุณ)
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[1] && authHeader.split(' ')[1].length > 10) { 
        // ถ้า Token ดูเหมือนมีอยู่
        req.user = { id: 101, username: 'temp_uploader' }; 
        return next();
    }
    // หากไม่มี Token หรือไม่ถูกต้อง
    return res.status(403).json({ message: 'Authentication required for file upload.' });
};


// 🔥 POST /api/upload/image (การอัปโหลดรูปภาพ)
// ใช้ verifyToken และ upload.single('file')
router.post('/image', verifyToken, upload.single('file'), (req, res) => {
    
    // Multer จะจัดการไฟล์และเก็บข้อมูลไว้ใน req.file
    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided.' });
    }
    
    // สร้าง URL สาธารณะของไฟล์
    // **หมายเหตุ:** ต้องแน่ใจว่า Frontend และ Backend อยู่บน Port เดียวกัน
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // ส่ง URL กลับไปให้ Frontend
    res.status(200).json({ 
        message: 'Image uploaded successfully!',
        url: fileUrl // Frontend จะใช้ URL นี้ในการสร้าง Post
    });
});


export default router;