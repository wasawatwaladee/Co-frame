import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import notFoundMiddleware from './middlewares/not-found.Middleware.js';
import errorMiddleware from './middlewares/error.Middleware.js';
import mainRouter from './routes/main.route.js';
import { apiLimiter } from './middlewares/rateLimiter.middleware.js';

const app = express();

// console.log('gggggg')

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// app.use("/api", mainRouter )


// Homepage
app.get('/', (req, res) => {
    res.send("Hello from homepage");
});

// //notfound middleware
// app.use(notFoundMiddleware)

// //error middleware
// app.use(errorMiddleware)



export default app;




