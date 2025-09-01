import { Router } from 'express';
import { authenticated } from '../../middlewares/authentication.js';
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourse,
  requestPublishCourse,
  updateCourse,
} from './course.controller.js';
import { authorize } from '../../middlewares/authorize.js';
import upload from '../../shared/utlis/multer.js';

const router = Router();

// courses routes

router.post('/', authenticated, authorize('instructor'), upload.single('thumbnail'), createCourse);
router.patch(
  '/update/:courseId',
  authenticated,
  authorize('instructor'),
  upload.single('thumbnail'),
  updateCourse
);
router.patch(
  '/:courseId/request-publish',
  authenticated,
  authorize('instructor'),
  requestPublishCourse
);
router.get('/', authenticated, getAllCourse);
router.get('/:courseId', authenticated, getCourse);
router.delete('/delete/:courseId', authenticated, authorize('instructor'), deleteCourse);

export default router;
