import prisma from "../config/prisma.js";
import createHttpError from "http-errors";

// 🛠️ Generic Helper (พระเอกของเรา)

async function toggleGenericLike(model, targetField, targetId, userId) {
  // 1. สร้างชื่อ Composite Key แบบ Dynamic
  // ถ้าเป็น Post -> "userId_postId"
  // ถ้าเป็น Comment -> "userId_commentId"
  const compositeKeyName = `userId_${targetField}`;

  // 2. ตรวจสอบว่ามี Like อยู่แล้วหรือไม่
  const existingLike = await model.findUnique({
    where: {
      // ใช้ [ ] เพื่อระบุ Key ที่เปลี่ยนไปตามตัวแปร
      [compositeKeyName]: {
        userId: userId,
        [targetField]: targetId,
      },
    },
  });

  if (existingLike) {
    // 3A. ถ้ามี -> ลบ (Unlike)
    await model.delete({
      where: { id: existingLike.id },
    });
    return { isLiked: false, message: "Unliked" };
  } else {
    // 3B. ถ้าไม่มี -> สร้าง (Like)
    await model.create({
      data: {
        userId: userId,
        [targetField]: targetId,
      },
    });
    return { isLiked: true, message: "Liked" };
  }
}

// 📦 Public Service Methods (ตัวที่ Controller จะเรียก)
export const likeService = {
  // สำหรับ Post
  async togglePostLike(postId, userId) {
    // เช็คว่ามี Post จริงไหม (ควรทำ)
    const post = await prisma.post.findUnique({ where: { id: +postId } });
    if (!post) throw createHttpError(404, "Post not found");

    // เรียกใช้ Generic Helper
    // ส่ง: prisma.postLike และชื่อ field 'postId'
    return await toggleGenericLike(prisma.postLike, "postId", +postId, userId);
  },

  // สำหรับ Comment
  async toggleCommentLike(commentId, userId) {
    // เช็คว่ามี Comment จริงไหม
    const comment = await prisma.comment.findUnique({
      where: { id: +commentId },
    });
    if (!comment) throw createHttpError(404, "Comment not found");

    // เรียกใช้ Generic Helper
    // ส่ง: prisma.commentLike และชื่อ field 'commentId'
    return await toggleGenericLike(
      prisma.commentLike,
      "commentId",
      +commentId,
      userId
    );
  },
};
