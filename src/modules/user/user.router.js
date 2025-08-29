import { Router } from 'express';
import { applyForInstructor, getUserProfile, updateProfile } from './user.controller.js';
import { authenticated } from '../../middlewares/authentication.js';
import upload from '../../shared/utlis/multer.js';

const router = Router();

router.patch('/profile/update', authenticated, upload.single('profileImage'), updateProfile);
router.get('/profile', authenticated, getUserProfile);
router.post('/apply-instructor', authenticated, applyForInstructor);

export default router;
