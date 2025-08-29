import User from './user.model.js';

export const updateProfileService = async (userId, data) => {
  try {
    const updateData = { ...data };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const getUserProfileService = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

export const applyForInstructorService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  if (user.role === 'instructor') {
    throw new Error('Already an instructor');
  }
  if (user.instructorRequest?.status === 'pending') {
    throw new Error('Request already pending');
  }
  user.instructorRequest = { status: 'pending', appliedAt: new Date() };
  await user.save();

  return user;
};
