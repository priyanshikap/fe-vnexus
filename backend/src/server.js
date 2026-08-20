import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import projectRoutes from './routes/projects.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'vnexus-backend' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
});

async function start() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    throw new Error('MONGODB_URI and JWT_SECRET must be set in backend/.env');
  }
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => console.log(`VNexus API running on http://localhost:${port}`));
}

start().catch((error) => {
  console.error(`Unable to start VNexus API: ${error.message}`);
  process.exit(1);
});
