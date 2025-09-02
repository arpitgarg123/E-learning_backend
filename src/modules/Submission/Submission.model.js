import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        selectedOption: {
          type: Number,
          required: true,
        },
      },
    ],
    score: { type: Number, default: 0 },
    feedback: { type: String },
    gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const QuizSubmission = mongoose.model('QuizSubmission', submissionSchema);
export default QuizSubmission;
