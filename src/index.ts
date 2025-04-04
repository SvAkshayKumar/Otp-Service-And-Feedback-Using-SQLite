import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import './config/db'; // just initialize

import otpRoutes from './routes/otpRoutes';
import { validateEmail } from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.set('trust proxy', true);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to OTP service');
});

app.use('/api', validateEmail, otpRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
