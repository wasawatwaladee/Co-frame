🎬 Movie Streaming & Community Platform

แพลตฟอร์มดูหนังออนไลน์พร้อมระบบชุมชนให้ผู้ใช้โพสต์พูดคุย แบ่งหมวดหมู่ตามประเภทหนัง รองรับการสตรีม ดูข้อมูลหนัง และระบบโซเชียลแบบเบา ๆ

🚀 Features
🔐 Authentication

สมัครสมาชิก / ล็อกอิน / ล็อกเอาต์

Token refresh

จัดการโปรไฟล์ผู้ใช้

🎞 Movie Streaming

ดูรายการภาพยนตร์ทั้งหมด

แสดงข้อมูลหนังแบบละเอียด

เปิดสตรีมแบบ secure URL / tokenized

ค้นหาภาพยนตร์

แสดงหนังตามหมวดหมู่

🗂 Categories (Genres)

แสดงหมวดหมู่ภาพยนตร์ทั้งหมด

แสดงภาพยนตร์ตามหมวดหมู่

(Admin) จัดการหมวดหมู่

🗣 Community Discussion

หมวดสนทนาแบ่งตามประเภทหนัง

ผู้ใช้สามารถสร้างโพสต์ พูดคุย แลกเปลี่ยนความเห็น

ระบบคอมเมนต์

แก้ไข/ลบโพสต์และคอมเมนต์ของตัวเอง

❤️ Interactions

กด Like โพสต์

กด Like คอมเมนต์

⭐ Optional

เพิ่มหนังเข้ารายการ Watchlist

ลบรายการ Watchlist

ดู Watchlist ของตัวเอง

📡 API Endpoints Overview
🔐 Auth
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
GET    /users/me
PUT    /users/me
GET    /users/:id

🎬 Movies
GET    /movies
GET    /movies/:id
GET    /movies/:id/stream
GET    /movies/search?q=

🗂 Categories
GET    /categories
GET    /categories/:id/movies

💬 Community Categories
GET    /community/categories
GET    /community/categories/:id
GET    /community/categories/:id/posts
POST   /community/categories (admin)
PUT    /community/categories/:id (admin)
DELETE /community/categories/:id (admin)

📝 Posts
GET    /posts
GET    /community/categories/:id/posts
POST   /community/categories/:id/posts
GET    /posts/:id
PUT    /posts/:id
DELETE /posts/:id

💬 Comments
GET    /posts/:id/comments
POST   /posts/:id/comments
PUT    /comments/:id
DELETE /comments/:id

👍 Likes
POST   /posts/:id/like
DELETE /posts/:id/like

POST   /comments/:id/like
DELETE /comments/:id/like

⭐ Watchlist
POST   /movies/:id/watchlist
DELETE /movies/:id/watchlist
GET    /users/me/watchlist

🧱 Tech Stack (suggested)

Node.js / Express

JWT Authentication

Database: MongoDB หรือ PostgreSQL

Video Streaming via HTTP Range Requests

Frontend: React / Next.js (Optional)

🏗 Project Structure (ตัวอย่าง)
/src
  /routes
  /controllers
  /models
  /middlewares
  /services
  /utils
