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
GET    /users/me
PUT    /users/me
GET    /users/:id (เสิร์ชหาข้อมูล user คนอื่น)

🎬 Movies
GET    /movies (get all)
GET    /movies/:id 

GET    /movies/:id/stream
GET    /movies/search?q=

🗂 Categories
GET    /categories  (all)
GET    /categories/:id

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
DELETE /posts/:id (admin can delete all post)

💬 Comments
GET    /posts/:id/comments
POST   /posts/:id/comments
PUT    /comments/:id
DELETE /comments/:id
DELETE /comments/:id(admin can delete all post)

👍 Likes
POST   /posts/:id/like
DELETE /posts/:id/like

POST   /comments/:id/like
DELETE /comments/:id/like

⭐ Watchlist
POST   /movies/:id/watchlist
DELETE /movies/:id/watchlist
GET    /users/me/watchlist




🛠 Admin API Endpoints
🔐 1) Admin Authentication

ใช้แยกจาก user ปกติ

POST   /admin/auth/login
POST   /admin/auth/logout
POST   /admin/auth/refresh
GET    /admin/me

🎬 2) Admin – Movies Management

จัดการหนังในระบบทั้งหมด เช่น เพิ่ม/แก้ไข/ลบ

GET    /admin/movies
POST   /admin/movies
GET    /admin/movies/:id
PUT    /admin/movies/:id
DELETE /admin/movies/:id

Upload Assets
POST   /admin/movies/:id/upload-thumbnail
POST   /admin/movies/:id/upload-video

🗂 3) Admin – Movie Categories

จัดการหมวดหมู่ของหนัง (เช่น Action, Comedy)

GET    /admin/categories
POST   /admin/categories
GET    /admin/categories/:id
PUT    /admin/categories/:id
DELETE /admin/categories/:id

👥 4) Admin – User Management

ดูข้อมูลผู้ใช้ทั้งหมด + จัดการสิทธิ์

GET    /admin/users
GET    /admin/users/:id
PUT    /admin/users/:id     (แก้ข้อมูล, Ban, Unban)
DELETE /admin/users/:id     (ลบ user)


ตัวอย่างฟีเจอร์:

POST   /admin/users/:id/ban
POST   /admin/users/:id/unban
POST   /admin/users/:id/set-role

💬 5) Admin – Community Category Management

หมวดหมู่โพสต์สำหรับพูดคุยใน Community

GET    /admin/community/categories
POST   /admin/community/categories
GET    /admin/community/categories/:id
PUT    /admin/community/categories/:id
DELETE /admin/community/categories/:id

📝 6) Admin – Post Management

ลบโพสต์ที่ผิดกฎ ดูโพสต์ทั้งหมด หรือค้นหาโพสต์ที่ถูกรายงาน

GET    /admin/posts
GET    /admin/posts/:id
DELETE /admin/posts/:id

💬 7) Admin – Comment Management

จัดการคอมเมนต์ไม่เหมาะสม

GET    /admin/comments
GET    /admin/comments/:id
DELETE /admin/comments/:id

🚨 8) Admin – Reports (ถ้ามีระบบแจ้งรายงาน)

ให้ user รายงานโพสต์/คอมเมนต์

GET    /admin/reports
GET    /admin/reports/:id
POST   /admin/reports/:id/resolve
POST   /admin/reports/:id/ignore

📊 9) Admin Dashboard (Optional)

แสดงสถิติต่าง ๆ

GET    /admin/dashboard/overview
GET    /admin/dashboard/users
GET    /admin/dashboard/movies
GET    /admin/dashboard/community

🎯 สรุป Admin API ที่คุณจะได้

✔ จัดการหนัง
✔ จัดการหมวดหมู่
✔ จัดการ user + roles
✔ จัดการ community
✔ ลบโพสต์/คอมเมนต์
✔ ระบบรายงาน
✔ แดชบอร์ด
