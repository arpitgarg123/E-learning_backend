import { Router } from 'express';
import { authorize } from '../../middlewares/authorize.js';
import {
  getAllCourseRequests,
  getInstructorRequests,
  reviewCourse,
  reviewInstructorRequest,
} from './admin.controller.js';
import { authenticated } from '../../middlewares/authentication.js';

const router = Router();

// Admin views all requests
router.get('/instructor-request', authenticated, authorize('admin'), getInstructorRequests);

// Admin approves/rejects
router.post(
  '/instructor-request/:userId',
  authenticated,
  authorize('admin'),
  reviewInstructorRequest
);
// review course
router.get('/course-requests', authenticated, authorize('admin'), getAllCourseRequests);
router.patch('/:courseId/review', authenticated, authorize('admin'), reviewCourse);

export default router;
