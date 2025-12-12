import express from "express";
import morgan from "morgan";
import cors from "cors";

import path from "path"; // 💡 เพิ่ม: สำหรับจัดการ File Path
import fs from 'fs'; // 💡 เพิ่ม: สำหรับจัดการ File System (สร้างโฟลเดอร์)
import { fileURLToPath } from 'url';

import notFoundMiddleware from "./middlewares/not-found.Middleware.js";
import errorMiddleware from "./middlewares/error.Middleware.js";
import mainRouter from "./routes/main.route.js";
import postRouter from "./routes/post.route.js";

import categoriesRoutes from "./routes/categories.route.js";
import movieRouter from "./routes/movie.route.js";
import commentRouter from "./routes/coment.route.js";
import trendRouter from "./routes/trending.route.js";

import uploadRouter from "./routes/upload.route.js"; // 🔥 เพิ่ม: นำเข้า Upload Router

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// 🔥 1. STATIC FOLDER SETUP: กำหนดให้ Server สามารถเสิร์ฟรูปภาพที่อัปโหลดได้
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// ตรวจสอบและสร้างโฟลเดอร์ 'uploads' ถ้ายังไม่มี
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    console.log(`Created directory: ${UPLOAD_DIR}`);
}

// Testpage
app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

app.use("/api", mainRouter);

app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/categories", categoriesRoutes);
app.use("/api/trending", trendRouter);
app.use("/movies", movieRouter);

app.use('/uploads', express.static(UPLOAD_DIR));
app.use("/api/upload", uploadRouter);

//notfound middleware
app.use(notFoundMiddleware);

//error middleware
app.use(errorMiddleware);

export default app;
