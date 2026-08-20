import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['student', 'faculty'], required: true },
    registrationNumber: { type: String, trim: true },
    course: { type: String, trim: true },
    school: { type: String, trim: true },
    title: { type: String, trim: true },
    department: { type: String, trim: true },
    office: { type: String, trim: true },
    phone: { type: String, trim: true },
    researchInterests: { type: String, trim: true },
    profilePicture: { type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
