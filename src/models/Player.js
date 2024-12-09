import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  gamesPlayed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  totalScore: { type: Number, default: 0 },
  prizesWon: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prize' }]
}, {
  timestamps: true
});

export default mongoose.model('Player', PlayerSchema);