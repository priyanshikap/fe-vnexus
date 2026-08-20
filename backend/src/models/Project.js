import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, enum: ['research', 'patent', 'workshop'], required: true },
    department: { type: String, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
