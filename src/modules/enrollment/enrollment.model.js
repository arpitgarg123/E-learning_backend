import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  progress: {
    completedLessons: { type: Number, default: 0 },
    totalLessons: { type: Number, default: 0 },
  },
  paymentStatus: {
    type: String,
    enum: ['free', 'pending', 'completed', 'failed'],
    default: 'pending',
  },
  paymentId: { type: String },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
