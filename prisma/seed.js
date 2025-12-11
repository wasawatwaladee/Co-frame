// prisma/seed.js

import { PrismaClient } from "../src/generated/prisma/client.js";
const prisma = new PrismaClient()
console.log('prisma connected')

async function main() {
  console.log('Start seeding movie data...')

  // ⭐️ ข้อมูลหนัง 3 เรื่อง
  const movieData = [
    {
      id: 1,
      title: 'Bigbuck',
      description: 'Big Buck Bunny, a large, friendly rabbit who is harassed by a group of rude, small rodents. ',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg',
      duration: 10, // ใช้ null แทน 'NULL'
      createdAt: new Date('2025-12-03T09:19:11.445Z'),
      updatedAt: new Date('2025-12-03T09:19:11.445Z'),
      categoryId: 1, // ⭐️ สมมติว่ามี categoryId เป็น 1
    },
    {
      id: 2,
      title: 'For Bigger Joyrides',
      description: 'This is a short animation that was created as a promotional piece to advertise bigger cars and bigger joyrides',
      thumbnail: 'https://images-cdn.ispot.tv/ad/7TK8/default-large.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      poster: 'https://images-cdn.ispot.tv/ad/7TK8/default-large.jpg',
      duration: 15,
      createdAt: new Date('2025-12-03T09:19:11.446Z'),
      updatedAt: new Date('2025-12-03T09:19:11.446Z'),
      categoryId: 2, // ⭐️ สมมติว่ามี categoryId เป็น 2
    },
    {
      id: 3,
      title: 'Tears of Steel',
      description: 'A group of scientists and warriors in a future setting as they attempt to correct a catastrophic event that led to the collapse of the world.',
      thumbnail: 'https://resizing.flixster.com/oo9VGItEyVU48bUnUO23gvP5mrA=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10875273_v_h9_ac.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      poster: 'https://resizing.flixster.com/oo9VGItEyVU48bUnUO23gvP5mrA=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10875273_v_h9_ac.jpg',
      duration: 12,
      createdAt: new Date('2025-12-03T09:19:11.446Z'),
      updatedAt: new Date('2025-12-03T09:19:11.446Z'),
      categoryId: 1, // ⭐️ สมมติว่ามี categoryId เป็น 1
    },
    {
      id: 4,
      title: 'Sintel',
      description: 'Sintel, who embarks on a perilous journey across a harsh world to find the baby dragon she once rescued and befriended.',
      thumbnail: 'https://studio.blender.org/files/cache/7d/81/7d81005541616e9f05aa992d508f19ff.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      poster: 'https://studio.blender.org/files/cache/7d/81/7d81005541616e9f05aa992d508f19ff.jpg',
      duration: 14,
      createdAt: new Date('2025-12-03T09:19:11.446Z'),
      updatedAt: new Date('2025-12-03T09:19:11.446Z'),
      categoryId: 1, // ⭐️ สมมติว่ามี categoryId เป็น 1
    },
    {
      id: 5,
      title: 'Elephants-dream',
      description: 'Emo, a young and naive inhabitant, and Proog, an older resident, as they navigate a gigantic, surreal machine. he story explores themes of reality, imagination, and communication.',
      thumbnail: 'https://studio.blender.org/files/cache/bc/94/bc94c954783f851cdfe471c3311e24d5.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      poster: 'https://studio.blender.org/files/cache/bc/94/bc94c954783f851cdfe471c3311e24d5.jpg',
      duration: 13,
      createdAt: new Date('2025-12-03T09:19:11.446Z'),
      updatedAt: new Date('2025-12-03T09:19:11.446Z'),
      categoryId: 1, // ⭐️ สมมติว่ามี categoryId เป็น 1
    },
  ];

  const categoryData = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Drama' },
    { id: 4, name: 'Horror' },
    { id: 5, name: 'Sci-Fi' },
    { id: 6, name: 'Romance' },
    { id: 7, name: 'Thriller' },
    { id: 8, name: 'Documentary' },

  ]

   const communityCategoryData = [
    { id: 1, name: 'Action' ,slug:"Action"},
    { id: 2, name: 'Comedy' ,slug:"Comedy"},
    { id: 3, name: 'Drama' ,slug:"Drama"},
    { id: 4, name: 'Horror' ,slug:"Horror"},
    { id: 5, name: 'Sci-Fi' ,slug:"Sci-fi"},
    { id: 6, name: 'Romance' ,slug:"Romance"},
    { id: 7, name: 'Thriller' ,slug:"Thriller"},
    { id: 8, name: 'Documentary' ,slug:"Documentary"},

  ]


    for(const communityCategory of communityCategoryData){
    await prisma.communityCategory.upsert({
      where: { id: communityCategory.id },
      create: { ...communityCategory },
      update: { ...communityCategory },
  })
  console.log('Seeding communityCategory finished')
    }
    for (const category of categoryData) {
    await prisma.movieCategory.upsert({
      where: { id: category.id },
      create: { ...category },
      update: { ...category },
  })
   

  console.log('Seeding finished.');
}

  for (const movie of movieData) {
    // ใช้ upsert เพื่ออัปเดตถ้ามี ID อยู่แล้ว หรือสร้างใหม่ถ้าไม่มี
    await prisma.movie.upsert({
      where: { id: movie.id },
      update: { ...movie }, // อัปเดตข้อมูลทั้งหมดหาก ID มีอยู่
      create: { ...movie }, // สร้างใหม่หาก ID ไม่มีอยู่
    });
    console.log(`Upserted movie with ID: ${movie.id}`);
  }


}

main()
.then(()=>{
  console.log('seed successfully')
})
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })