import * as questionService from '../services/questionService.js';
import { successResponse } from '../utils/responseHandler.js';

export const createQuestion = async (req, res, next) => {
  try {
    const questionData = req.body;
    const question = await questionService.createQuestion(questionData);
    successResponse(res, 201, 'Question created successfully', question);
  } catch (error) {
    next(error);
  }
};

export const getQuestions = async (req, res, next) => {
  try {
    const { difficulty, category } = req.query;
    const questions = await questionService.getQuestions(difficulty, category);
    successResponse(res, 200, 'Questions retrieved successfully', questions);
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const updateData = req.body;
    const updatedQuestion = await questionService.updateQuestion(questionId, updateData);
    successResponse(res, 200, 'Question updated successfully', updatedQuestion);
  } catch (error) {
    next(error);
  }
};