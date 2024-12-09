import express from 'express';
import * as gameController from '../controllers/gameController.js';

const router = express.Router();

router.post('/start', gameController.startGame);
router.put('/:gameId/answer', gameController.submitAnswer);
router.get('/:gameId', gameController.getGameState);

export default router;