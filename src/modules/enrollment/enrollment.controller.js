import { asyncHandler } from '../../shared/utlis/asyncHandler.js';
import { enrollCourseService, verifyPaymentService } from './enrollment.service.js';

export const enrollCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.id;

  const result = await enrollCourseService({ studentId, courseId });

  if (result.free) {
    return res.status(201).json({
      message: 'Enrolled successfully (free course)',
      enrollment: result.enrollment,
    });
  }

  res.status(201).json({
    message: 'Enrollment pending, complete payment',
    order: result.order,
    enrollment: result.enrollment,
  });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const enrollment = await verifyPaymentService({
    enrollmentId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  res.status(200).json({
    message: 'Payment successful, enrollment confirmed',
    enrollment,
  });
});
