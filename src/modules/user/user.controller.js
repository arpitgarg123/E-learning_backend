import { asyncHandler } from '../../shared/utlis/asyncHandler.js';
import {
  applyForInstructorService,
  getUserProfileService,
  updateProfileService,
} from './user.service.js';
import { logger } from '../../shared/logger.js';
import { uploadToImageKit } from '../../shared/utlis/uploader.js';

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  logger.info(userId);
  const { name, email, bio, phone, profileImage, socialLinks } = req.body;
  let profileImageUrl = null;

  if (req.file) {
    profileImageUrl = await uploadToImageKit(req.file);
  }

  const updatedUser = await updateProfileService(userId, {
    name,
    email,
    bio,
    phone,
    ...(profileImageUrl && { profileImage: profileImageUrl }),
    socialLinks,
  });

  res.status(200).json({
    message: 'Profile updated successfully',
    user: updatedUser,
  });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await getUserProfileService(userId);
  res.status(200).json({
    user,
  });
});

export const applyForInstructor = asyncHandler(async (req, res) => {
  const user = await applyForInstructorService(req.user.id);
  res.status(200).json({ message: 'Instructor application submitted', user });
});
