import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.route.js';

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected database');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('server starting on port 3000');
});

app.use('/api/auth', authRouter);
