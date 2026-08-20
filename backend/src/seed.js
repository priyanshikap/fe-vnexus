import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Project from './models/Project.js';

await mongoose.connect(process.env.MONGODB_URI);
await User.deleteMany({});
await Project.deleteMany({});

const password = await bcrypt.hash('password123', 12);
const [student, faculty] = await User.create([
  {
    name: 'Jaanya Bagdi', email: 'student@vnexus.local', password, role: 'student',
    registrationNumber: '24BKT0029', course: 'B.Tech Computer Science', school: 'School of Computer Science and Engineering', phone: '+91 7869511627'
  },
  {
    name: 'Dr. Priya Sharma', email: 'faculty@vnexus.local', password, role: 'faculty',
    title: 'Associate Professor', department: 'Dept. of Computer Science', office: 'Academic Building 3, Room 205', phone: '+91 98765 43210', researchInterests: 'Machine Learning, Computer Vision, AI'
  }
]);

await Project.create([
  { title: 'Web3 and Blockchain Security Workshop', description: 'Hands-on workshop covering smart contract development and security auditing.', type: 'workshop', department: 'Computer Science', author: faculty._id, tags: ['blockchain', 'security'] },
  { title: 'AI Research Collaboration', description: 'A collaborative research project focused on practical machine learning systems.', type: 'research', department: 'Computer Science', author: faculty._id, tags: ['AI', 'machine learning'] },
  { title: 'Campus Innovation Patent', description: 'An innovation proposal for improving student research collaboration.', type: 'patent', department: 'Computer Science', author: student._id, tags: ['innovation'] }
]);

console.log('Database seeded. Demo login: student@vnexus.local / password123');
await mongoose.disconnect();
