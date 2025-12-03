import createHttpError from "http-errors";

const adminMiddleware = (req, res, next) => {
  const { role } = req.user;

  if (role !== "ADMIN") {
    return next(createHttpError(403, "Access denied. Admin only."));
  }

  next();
};

export default adminMiddleware;
