import express from "express";
import morgan from "morgan";
import cors from "cors";
import notFoundMiddleware from "./middlewares/not-found.Middleware.js";
import errorMiddleware from "./middlewares/error.Middleware.js";
import mainRouter from "./routes/main.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/coment.route.js";
import categoriesRoutes from "./routes/categories.route.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", mainRouter);

app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/categories", categoriesRoutes);

// //notfound middleware
// app.use(notFoundMiddleware)

// //error middleware
// app.use(errorMiddleware)

export default app;
