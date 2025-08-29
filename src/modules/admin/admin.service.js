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
