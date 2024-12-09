import Prize from '../models/Prize.js';
import AppError from '../utils/appError.js';

export const createPrize = async (prizeData) => {
  const prize = new Prize(prizeData);
  return await prize.save();
};

export const getPrizes = async () => {
  return await Prize.find();
};

export const updatePrize = async (prizeId, updateData) => {
  const prize = await Prize.findByIdAndUpdate(prizeId, updateData, { new: true, runValidators: true });
  
  if (!prize) {
    throw new AppError('Prize not found', 404);
  }

  return prize;
}