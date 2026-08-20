import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/profile', requireAuth, (req, res) => res.json({ user: req.user }));

router.patch('/profile', requireAuth, async (req, res, next) => {
  try {
    const allowedFields = ['name', 'registrationNumber', 'course', 'school', 'title', 'department', 'office', 'phone', 'researchInterests', 'profilePicture'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowedFields.includes(key)));
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
