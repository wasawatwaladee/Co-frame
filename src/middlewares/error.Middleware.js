export default (err, req, res, next) => {
  console.log(err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (err.name === "ZodError") {
    return res.status(400).json({
      message: "Validation Failed",
      details: err.errors,
    });
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
