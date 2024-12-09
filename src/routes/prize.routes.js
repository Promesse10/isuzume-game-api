import express from 'express';
import * as prizeController from '../controllers/prizeController.js';

const router = express.Router();

router.post('/', prizeController.createPrize);
router.get('/', prizeController.getPrizes);
router.put('/:prizeId', prizeController.updatePrize);

export default router;