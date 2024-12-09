import express from 'express';
import * as questionController from '../controllers/questionController.js';

const router = express.Router();

router.post('/', questionController.createQuestion);
router.get('/', questionController.getQuestions);
router.put('/:questionId', questionController.updateQuestion);

export default router;