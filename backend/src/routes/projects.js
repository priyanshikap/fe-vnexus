import { Router } from 'express';
import Project from '../models/Project.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.search) filter.$text = { $search: req.query.search };
    const projects = await Project.find(filter).populate('author', 'name role department').sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { title, description, type, department, tags = [] } = req.body;
    const project = await Project.create({ title, description, type, department, tags, author: req.user._id });
    res.status(201).json({ project });
  } catch (error) {
    next(error);
  }
});

export default router;
