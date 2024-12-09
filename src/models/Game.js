import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  selectedPrize: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize', required: true },
  score: { type: Number, default: 0 },
  currentQuestion: { type: Number, default: 0 },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  finished: { type: Boolean, default: false },
  language: { type: String, enum: ['en', 'rw'], default: 'rw' },
  questions: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    userAnswer: String,
    timeLeft: Number,
    isCorrect: Boolean
  }]
}, {
  timestamps: true
});

export default mongoose.model('Game', GameSchema);