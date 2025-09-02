import Course from '../courses/course.model.js';
import Enrollment from './enrollment.model.js';
import crypto from 'crypto';
import { razorpay } from '../../config/razorpay.js';
import { logger } from '../../shared/logger.js';

export const enrollCourseService = async ({ studentId, courseId }) => {
  const course = await Course.findById(courseId);
  if (!course) throw new error('Course not found');

  const existing = await Enrollment.findOne({ course: courseId, student: studentId });

  if (existing) {
    if (existing.paymentStatus === 'completed') {
      throw new Error('Already enrolled in this course');
    }
    if (existing.paymentStatus === 'pending') {
      throw new Error('Payment already in progress for this course');
    }
  }
  // Free course instant enrollment
  if (course.price === 0) {
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      paymentStatus: 'completed',
      progress: { totalLessons: course.lectures.length },
    });

    course.studentsEnrolled.push(studentId);
    await course.save();

    return { enrollment, free: true };
  }
  // for paid course enrollment
  const order = await razorpay.orders.create({
    amount: course.price * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  });

  const enrollment = await Enrollment.create({
    student: studentId,
    course: courseId,
    paymentStatus: 'pending',
    orderId: order.id,
    progress: { totalLessons: course.lectures.length },
  });

  return { enrollment, order };
};

//  Service to verify Razorpay payment
export const verifyPaymentService = async ({
  enrollmentId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) throw new Error('Enrollment not found');

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    enrollment.paymentStatus = 'failed';
    await enrollment.save();
    throw new Error('Payment verification failed');
  }

  enrollment.paymentStatus = 'completed';
  enrollment.paymentId = razorpay_payment_id;
  await enrollment.save();

  await Course.findByIdAndUpdate(enrollment.course, {
    $addToSet: { studentsEnrolled: enrollment.student },
  });

  return enrollment;
};
