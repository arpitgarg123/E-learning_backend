import { asyncHandler } from '../../shared/utlis/asyncHandler.js';
import { createQuizService, submitQuizService } from './quiz.service.js';

export const createQuiz = asyncHandler(async (req, res) => {
  const { lectureId } = req.params;
  const { questions } = req.body;
  const userId = req.user.id;
  const quiz = await createQuizService(lectureId, userId, questions);
  res.status(201).json({
    message: 'Quiz created successfully',
    quiz,
  });
});

export const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;
  const { submission, score } = await submitQuizService(quizId, req.user.id, answers);

  res.status(201).json({
    message: 'Quiz submitted',
    score,
    total: submission.answers.length,
    submission,
  });
});
