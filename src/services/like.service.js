import prisma from "../config/prisma.js";
import createHttpError from "http-errors";

async function toggleGenericLike(model, targetField, targetId, userId) {
  const compositeKeyName = `${targetField}_userId`;

  const existingLike = await model.findUnique({
    where: {
      [compositeKeyName]: {
        userId: userId,
        [targetField]: targetId,
      },
    },
  });

  if (existingLike) {
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

export const likeService = {
  async togglePostLike(postId, userId) {
    const post = await prisma.post.findUnique({ where: { id: +postId } });
    if (!post) throw createHttpError(404, "Post not found");

    return await toggleGenericLike(prisma.postLike, "postId", +postId, userId);
  },

  async toggleCommentLike(commentId, userId) {
    const comment = await prisma.comment.findUnique({
      where: { id: +commentId },
    });
    if (!comment) throw createHttpError(404, "Comment not found");

    return await toggleGenericLike(
      prisma.commentLike,
      "commentId",
      +commentId,
      userId
    );
  },
};
