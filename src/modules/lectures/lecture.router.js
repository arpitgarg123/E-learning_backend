import { Router } from 'express';
import { authenticated } from '../../middlewares/authentication.js';
import { authorize } from '../../middlewares/authorize.js';
import upload from '../../shared/utlis/multer.js';
import { addLecture, deleteLecture, getAllLecture, updateLecture } from './lecture.controller.js';

const router = Router();

// lectures routes
router.post(
  '/:courseId/lectures',
  authenticated,
  authorize('instructor'),
  upload.single('video'),
  addLecture
);
router.patch(
  '/:courseId/lectures/:lectureId',
  authenticated,
  authorize('instructor'),
  updateLecture
);
router.get('/:courseId/lectures', authenticated, getAllLecture);
router.delete(
  '/:courseId/lectures/:lectureId/delete',
  authenticated,
  authorize('instructor'),
  deleteLecture
);
export default router;
