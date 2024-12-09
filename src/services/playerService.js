import Player from '../models/Player.js';
import AppError from '../utils/appError.js';

export const createPlayer = async (name, phone, email) => {
  const existingPlayer = await Player.findOne({ $or: [{ phone }, { email }] });
  if (existingPlayer) {
    throw new AppError('Player with this phone or email already exists', 400);
  }

  const player = new Player({ name, phone, email });
  return await player.save();
};

export const getPlayerProfile = async (playerId) => {
  const player = await Player.findById(playerId)
    .populate('gamesPlayed')
    .populate('prizesWon');
  
  if (!player) {
    throw new AppError('Player not found', 404);
  }

  return player;
};

export const updatePlayer = async (playerId, updateData) => {
  const player = await Player.findByIdAndUpdate(playerId, updateData, { new: true, runValidators: true });
  
  if (!player) {
    throw new AppError('Player not found', 404);
  }

  return player;
};