import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Homepage
app.get('/', (req, res) => {
    res.send("Hello from homepage");
});

export default app;
