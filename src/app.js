import express from "express";
import morgan from "morgan";
import cors from "cors";
import notFoundMiddleware from "./middlewares/not-found.Middleware.js";
import errorMiddleware from "./middlewares/error.Middleware.js";
import mainRouter from "./routes/main.route.js";
import postRouter from "./routes/post.route.js";

import categoriesRoutes from "./routes/categories.route.js";
import movieRouter from "./routes/movie.route.js";
import commentRouter from "./routes/coment.route.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());



// Testpage
app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

app.use("/api", mainRouter);

app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/categories", categoriesRoutes);
app.use("/movies", movieRouter);

//notfound middleware
app.use(notFoundMiddleware);

//error middleware
app.use(errorMiddleware);

export default app;
