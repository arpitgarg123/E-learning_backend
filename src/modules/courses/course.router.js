import { Router } from 'express';
import { authenticated } from '../../middlewares/authentication.js';
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourse,
  getEnrolledCourse,
  getMyCourses,
  requestPublishCourse,
  updateCourse,
} from './course.controller.js';
import { authorize } from '../../middlewares/authorize.js';
import upload from '../../shared/utlis/multer.js';
import { checkEnrollment } from '../../middlewares/enrolledChecker.js';

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
router.get('/get/my-courses', authenticated, getMyCourses);
router.get('/enrolled/:courseId', authenticated, checkEnrollment, getEnrolledCourse);
router.delete('/delete/:courseId', authenticated, authorize('instructor'), deleteCourse);

export default router;
