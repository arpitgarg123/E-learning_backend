import { Router } from 'express';
import { authenticated } from '../../middlewares/authentication.js';
import { addLecture, createCourse } from './course.controller.js';
import { authorize } from '../../middlewares/authorize.js';
import upload from '../../shared/utlis/multer.js';

const router = Router();

router.post('/', authenticated, authorize('instructor'), upload.single('thumbnail'), createCourse);

router.post(
  '/:courseId/lectures',
  authenticated,
  authorize('instructor'),
  upload.single('video'),
  addLecture
);

export default router;
