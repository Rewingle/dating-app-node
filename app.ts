import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import loginRouter from './routes/loginRouter';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

app.use('/api', loginRouter,userRouter);

app.listen(5000, () => {
    console.log('Server is running on port ' + port);
});
