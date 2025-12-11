import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { getUserBy } from "../services/user.service.js";

export default async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw createHttpError[401]("Unauthorized 1");
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw createHttpError[401]("Unauthorized 2");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log(payload);

  const foundUser = await getUserBy({ id: payload.id });
  if (!foundUser) {
    throw createHttpError[401]("Unauthorized 3");
  }
  const { password, ...userData } = foundUser;
  req.user = userData;
  next();
};

export const optionalAuthenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authorization.split(" ")[1];

    if (!token || token === "null" || token === "undefined") {
      req.user = null;
      return next();
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      const foundUser = await getUserBy({ id: payload.id });

      if (foundUser) {
        const { password, ...userData } = foundUser;
        req.user = userData;
      } else {
        req.user = null;
      }
    } catch (tokenError) {
      console.log("Optional Auth: Token invalid, treating as guest.");
      req.user = null;
    }

    next();
  } catch (err) {
    next(err);
  }
};
