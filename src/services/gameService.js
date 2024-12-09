import Game from '../models/Game.js';
import Player from '../models/Player.js';
import Question from '../models/Question.js';
import Prize from '../models/Prize.js';
import AppError from '../utils/appError.js';

export const startGame = async (playerName, playerPhone, selectedPrizeId) => {
  if (!playerName || !playerPhone || !selectedPrizeId) {
    throw new AppError('Missing required fields', 400);
  }

  let player = await Player.findOne({ phone: playerPhone });
  if (!player) {
    player = new Player({ name: playerName, phone: playerPhone });
    await player.save();
  }

  const prize = await Prize.findById(selectedPrizeId);
  if (!prize) {
    throw new AppError('Invalid prize selected', 400);
  }

  const questions = await Question.aggregate([
    { $match: { difficulty: prize.difficulty } },
    { $sample: { size: prize.questionsCount } }
  ]);

  const newGame = new Game({
    player: player._id,
    selectedPrize: prize._id,
    questions: questions.map(q => ({ question: q._id }))
  });

  const savedGame = await newGame.save();
  player.gamesPlayed.push(savedGame._id);
  await player.save();

  return savedGame;
};

export const submitAnswer = async (gameId, answer, timeLeft) => {
  const game = await Game.findById(gameId).populate('questions.question');
  if (!game) {
    throw new AppError('Game not found', 404);
  }

  const currentQuestionIndex = game.currentQuestion;
  const currentQuestion = game.questions[currentQuestionIndex];
  const questionData = currentQuestion.question;

  currentQuestion.userAnswer = answer;
  currentQuestion.timeLeft = timeLeft;
  currentQuestion.isCorrect = answer === questionData.correctAnswer[game.language];

  if (currentQuestion.isCorrect) {
    game.score += 1;
  }

  game.currentQuestion += 1;

  if (game.currentQuestion >= game.questions.length) {
    game.finished = true;
    game.endTime = Date.now();

    const player = await Player.findById(game.player);
    player.totalScore += game.score;
    if (game.score === game.questions.length) {
      player.prizesWon.push(game.selectedPrize);
    }
    await player.save();
  }

  await game.save();

  return {
    score: game.score,
    finished: game.finished,
    nextQuestion: game.currentQuestion < game.questions.length ? game.questions[game.currentQuestion].question : null
  };
};

export const getGameState = async (gameId) => {
  const game = await Game.findById(gameId)
    .populate('player')
    .populate('selectedPrize')
    .populate('questions.question');

  if (!game) {
    throw new AppError('Game not found', 404);
  }

  return {
    playerName: game.player.name,
    selectedPrize: game.selectedPrize.name,
    score: game.score,
    currentQuestion: game.currentQuestion,
    finished: game.finished,
    questions: game.questions.map(q => ({
      question: q.question.text,
      options: q.question.options
    }))
  };
};