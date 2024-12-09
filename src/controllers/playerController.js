import * as playerService from '../services/playerService.js';
import { successResponse } from '../utils/responseHandler.js';

export const createPlayer = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    const player = await playerService.createPlayer(name, phone, email);
    successResponse(res, 201, 'Player created successfully', player);
  } catch (error) {
    next(error);
  }
};

export const getPlayerProfile = async (req, res, next) => {
  try {
    const { playerId } = req.params;
    const profile = await playerService.getPlayerProfile(playerId);
    successResponse(res, 200, 'Player profile retrieved successfully', profile);
  } catch (error) {
    next(error);
  }
};

export const updatePlayer = async (req, res, next) => {
  try {
    const { playerId } = req.params;
    const updateData = req.body;
    const updatedPlayer = await playerService.updatePlayer(playerId, updateData);
    successResponse(res, 200, 'Player updated successfully', updatedPlayer);
  } catch (error) {
    next(error);
  }
};