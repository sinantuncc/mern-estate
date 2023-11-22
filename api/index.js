import express from 'express';
import mongoose, { mongo } from 'mongoose';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
