import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

function publicUser(user) {
  const data = user.toObject ? user.toObject() : user;
  delete data.password;
  return data;
}

function createToken(user) {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password, role = 'student', ...profile } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
    if (!['student', 'faculty'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: 'Email is already registered' });

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
      role,
      ...profile
    });
    return res.status(201).json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() }).select('+password');
    if (!user || !(await bcrypt.compare(password || '', user.password)) || (role && user.role !== role)) {
      return res.status(401).json({ message: 'Invalid email, password, or role' });
    }
    return res.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.get('/me', requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

export default router;
