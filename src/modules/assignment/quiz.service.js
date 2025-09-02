import { logger } from '../../shared/logger.js';
import QuizSubmission from '../Submission/Submission.model.js';
import Quiz from './quiz.model.js';

export const createQuizService = async (lectureId, userId, questions) => {
  const quiz = await Quiz.create({
    lecture: lectureId,
    createdBy: userId,
    questions,
  });
  return quiz;
};

export const submitQuizService = async (quizId, userId, answers) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error('Quiz not found');

  if (!Array.isArray(answers) || answers.length === 0) {
    throw new Error('answers must be a non-empty array');
  }

  let score = 0;

  answers.forEach((ans) => {
    const question = quiz.questions.id(ans.questionId);
    if (question && ans.selectedOption === question.correctAnswer) {
      score++;
    }
  });

  const submission = await QuizSubmission.create({
    quiz: quizId,
    student: userId,
    answers,
    score,
  });
  return { submission, score };
};
