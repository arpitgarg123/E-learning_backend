import { Router } from 'express';
import { authenticated } from '../../middlewares/authentication.js';
import { authorize } from '../../middlewares/authorize.js';
import { createQuiz, submitQuiz } from './quiz.contoller.js';
import { checkEnrollment } from '../../middlewares/enrolledChecker.js';

const router = Router();

router.post('/:lectureId/create', authenticated, authorize('instructor'), createQuiz);
router.post('/:quizId/submit', authenticated, submitQuiz);
export default router;
