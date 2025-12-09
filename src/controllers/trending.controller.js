// ตัวอย่าง Logic ใน Backend Controller (Prisma/Express)

import prisma from "../config/prisma.js";

const getTrendingHashtags = async (req, res) => {
    const { categoryId } = req.query;

    // 1. ดึง Posts (พร้อม Category เพื่อ Grouping)
    const posts = await prisma.post.findMany({
        where: categoryId ? { categoryId: Number(categoryId) } : {},
        select: {
            content: true,
            category: { select: { id: true, name: true } }
        }
    });

    if (posts.length === 0) {
        return res.json({ trending: [] });
    }

    // 2. ประมวลผลและนับ Hashtag
    const categoryGroups = {};

    posts.forEach(post => {
        const catName = post.category?.name || 'Uncategorized';
        
        // Regex เพื่อดึง Hashtag
        const hashtags = post.content.match(/#(\w+)/g) || [];

        // Group Hashtags by Category
        if (!categoryGroups[catName]) {
            categoryGroups[catName] = { counts: {}, posts: [] };
        }
        
        hashtags.forEach(tag => {
             // นับความถี่
             categoryGroups[catName].counts[tag] = (categoryGroups[catName].counts[tag] || 0) + 1;
        });
        
        // (คุณอาจเลือกเก็บ Post object ไว้ด้วย ถ้าต้องการแสดงรายละเอียด)
    });

    // 3. จัดเรียงและกรอง 10 อันดับแรก
    const trendingData = Object.entries(categoryGroups).map(([catName, data]) => {
        const sortedHashtags = Object.entries(data.counts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 10) // ⭐️ 10 อันดับแรก
            .map(([hashtag, count]) => ({ hashtag, count }));

        return {
            categoryName: catName,
            trendingHashtags: sortedHashtags
        };
    });

    res.json({ trending: trendingData });
};
// สร้าง route: router.get('/trending/hashtags', getTrendingHashtags);

export default getTrendingHashtags;