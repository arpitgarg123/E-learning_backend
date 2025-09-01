import Course from '../courses/course.model.js';
import User from '../user/user.model.js';

export const getInstructorRequestsService = async () => {
  return await User.find({ 'instructorRequest.status': 'pending' }).select('-password');
};

export const reviewInstructorRequestService = async (adminId, userId, action) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!['approved', 'rejected'].includes(action)) {
    throw new Error('Invalid action');
  }

  user.instructorRequest.status = action;
  user.instructorRequest.reviewedAt = new Date();
  user.instructorRequest.reviewedBy = adminId;

  if (action === 'approved') {
    user.role = 'instructor';
  }

  await user.save();
  return user;
};

// get all courses requests

export const getAllPendingCourseRequestService = async () => {
  const courses = await Course.find({ status: 'pending_approval' })
    .populate('instructor', 'name email')
    .sort({ createdAt: -1 });

  return courses;
};

// Admin reviews course
export const reviewCourseService = async (courseId, action) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error('Course not found');

  if (action === 'approve') {
    course.status = 'published';
  } else if (action === 'reject') {
    course.status = 'rejected';
  } else {
    throw new Error('Invalid action');
  }

  await course.save();
  return course;
};
