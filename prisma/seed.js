// prisma/seed.js

import { PrismaClient } from "../src/generated/prisma/client.js";
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding movie data...')

  // ⭐️ ข้อมูลหนัง 3 เรื่อง
  const movieData = [
    {
      id: 1,
      title: 'Bigbuck',
      description: 'Big Buck Bunny',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg',
      duration: null, // ใช้ null แทน 'NULL'
      createdAt: new Date('2025-12-03T09:19:11.445Z'),
      updatedAt: new Date('2025-12-03T09:19:11.445Z'),
      categoryId: 1, // ⭐️ สมมติว่ามี categoryId เป็น 1
    },
    {
      id: 2,
      title: 'For Bigger Joyrides',
      description: 'For Bigger Joyrides sample',
      thumbnail: 'https://images-cdn.ispot.tv/ad/7TK8/default-large.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      poster: 'https://images-cdn.ispot.tv/ad/7TK8/default-large.jpg',
      duration: null,
      createdAt: new Date('2025-12-03T09:19:11.446Z'),
      updatedAt: new Date('2025-12-03T09:19:11.446Z'),
      categoryId: 2, // ⭐️ สมมติว่ามี categoryId เป็น 2
    },
    {
      id: 3,
      title: 'Tears of Steel',
      description: 'Tears of Steel sample',
      thumbnail: 'https://resizing.flixster.com/oo9VGItEyVU48bUnUO23gvP5mrA=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10875273_v_h9_ac.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      poster: 'https://resizing.flixster.com/oo9VGItEyVU48bUnUO23gvP5mrA=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10875273_v_h9_ac.jpg',
      duration: null,
      createdAt: new Date('2025-12-03T09:19:11.446Z'),
      updatedAt: new Date('2025-12-03T09:19:11.446Z'),
      categoryId: 1, // ⭐️ สมมติว่ามี categoryId เป็น 1
    },
  ];

  for (const movie of movieData) {
    // ใช้ upsert เพื่ออัปเดตถ้ามี ID อยู่แล้ว หรือสร้างใหม่ถ้าไม่มี
    await prisma.movie.upsert({
      where: { id: movie.id },
      update: { ...movie }, // อัปเดตข้อมูลทั้งหมดหาก ID มีอยู่
      create: { ...movie }, // สร้างใหม่หาก ID ไม่มีอยู่
    });
    console.log(`Upserted movie with ID: ${movie.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })