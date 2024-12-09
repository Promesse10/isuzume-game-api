import mongoose from 'mongoose';

const PrizeSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    rw: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    rw: { type: String, required: true }
  },
  imageUrl: { type: String },
  value: { type: Number },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['cash', 'exam', 'physical'], required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  questionsCount: { type: Number, required: true },
  timePerQuestion: { type: Number, required: true } // in seconds
}, {
  timestamps: true
});

export default mongoose.model('Prize', PrizeSchema);