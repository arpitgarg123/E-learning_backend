import Enrollment from '../modules/enrollment/enrollment.model.js';

export const checkEnrollment = async (req, res, next) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;

  const enrollment = await Enrollment.findOne({
    student: userId,
    course: courseId,
    paymentStatus: 'completed',
  });

  if (!enrollment) {
    return res.status(403).json({ message: 'You are not enrolled in this course' });
  }

  req.enrollment = enrollment; // pass enrollment info forward
  next();
};
