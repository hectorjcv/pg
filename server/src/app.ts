import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log('Server Running on PORT:', PORT);
});