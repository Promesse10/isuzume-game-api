import Question from '../models/Question.js';
import AppError from '../utils/appError.js';

export const createQuestion = async (questionData) => {
  const question = new Question(questionData);
  return await question.save();
};

export const getQuestions = async (difficulty, category) => {
  const query = {};
  if (difficulty) query.difficulty = difficulty;
  if (category) query.category = category;

  return await Question.find(query);
};

export const updateQuestion = async (questionId, updateData) => {
  const question = await Question.findByIdAndUpdate(questionId, updateData, { new: true, runValidators: true });
  
  if (!question) {
    throw new AppError('Question not found', 404);
  }

  return question;
};