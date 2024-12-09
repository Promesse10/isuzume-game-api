import * as prizeService from '../services/prizeService.js';
import { successResponse } from '../utils/responseHandler.js';

export const createPrize = async (req, res, next) => {
  try {
    const prizeData = req.body;
    const prize = await prizeService.createPrize(prizeData);
    successResponse(res, 201, 'Prize created successfully', prize);
  } catch (error) {
    next(error);
  }
};

export const getPrizes = async (req, res, next) => {
  try {
    const prizes = await prizeService.getPrizes();
    successResponse(res, 200, 'Prizes retrieved successfully', prizes);
  } catch (error) {
    next(error);
  }
};

export const updatePrize = async (req, res, next) => {
  try {
    const { prizeId } = req.params;
    const updateData = req.body;
    const updatedPrize = await prizeService.updatePrize(prizeId, updateData);
    successResponse(res, 200, 'Prize updated successfully', updatedPrize);
  } catch (error) {
    next(error);
  }
};