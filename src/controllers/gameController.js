import * as gameService from '../services/gameService.js';
import { successResponse } from '../utils/responseHandler.js';

export const startGame = async (req, res, next) => {
  try {
    const { playerName, playerPhone, selectedPrizeId } = req.body;
    const game = await gameService.startGame(playerName, playerPhone, selectedPrizeId);
    successResponse(res, 201, 'Game started successfully', { gameId: game._id });
  } catch (error) {
    next(error);
  }
};

export const submitAnswer = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { answer, timeLeft } = req.body;
    const result = await gameService.submitAnswer(gameId, answer, timeLeft);
    successResponse(res, 200, 'Answer submitted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getGameState = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const gameState = await gameService.getGameState(gameId);
    successResponse(res, 200, 'Game state retrieved successfully', gameState);
  } catch (error) {
    next(error);
  }
};