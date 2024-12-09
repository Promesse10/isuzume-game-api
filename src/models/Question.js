import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  text: {
    en: { type: String, required: true },
    rw: { type: String, required: true }
  },
  options: {
    en: [{ type: String, required: true }],
    rw: [{ type: String, required: true }]
  },
  correctAnswer: {
    en: { type: String, required: true },
    rw: { type: String, required: true }
  },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  category: { type: String, required: true },
  imageUrl: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Question', QuestionSchema);