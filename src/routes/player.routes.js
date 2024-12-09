import express from 'express';
import * as playerController from '../controllers/playerController.js';

const router = express.Router();

router.post('/', playerController.createPlayer);
router.get('/:playerId', playerController.getPlayerProfile);
router.put('/:playerId', playerController.updatePlayer);

export default router;