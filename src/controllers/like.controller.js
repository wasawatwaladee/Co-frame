import createHttpError from "http-errors";
import prisma from "../config/prisma.js";

export const createLike = async (req, res, next) => {
  const { id } = req.params;
  const postData = await prisma.post.findUnique({
    where: { id: +id },
  });
  const haveLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: req.user.id,
        postId: +id,
      },
    },
  });
  if (haveLike) {
    return next(createHttpError[400]("already like this post"));
  }
  if (!postData) {
    return next(createHttpError[401]("cannot like this post"));
  }
  const result = await prisma.like.create({
    data: { userId: req.user.id, postId: +id },
  });
  res.json({
    message: "Like done",
    result,
  });
};

export const deleteLike = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const haveLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: req.user.id,
        postId: +id,
      },
    },
  });
  if (!haveLike) {
    return next(createHttpError[400]("already unlike this post"));
  }
  const result = await prisma.like.delete({
    where: {
      userId_postId: {
        userId: req.user.id,
        postId: +id,
      },
    },
  });
  res.json({
    message: "unLike done",
    result,
  });
};
