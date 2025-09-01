import { asyncHandler } from '../../shared/utlis/asyncHandler.js';
import Course from '../courses/course.model.js';
import {
  getAllPendingCourseRequestService,
  getInstructorRequestsService,
  reviewCourseService,
  reviewInstructorRequestService,
} from './admin.service.js';

// Admin gets pending requests for the instructor role
export const getInstructorRequests = asyncHandler(async (_, res) => {
  const requests = await getInstructorRequestsService();
  res.status(200).json({ requests });
});

//  Admin approves/rejects for the instructor requests
export const reviewInstructorRequest = asyncHandler(async (req, res) => {
  const { action } = req.body;
  const { userId } = req.params;

  const user = await reviewInstructorRequestService(req.user.id, userId, action);

  res.status(200).json({
    message: `Instructor request ${action}`,
    user,
  });
});

//  Admin approves/rejects for the instructor requests
export const getAllCourseRequests = asyncHandler(async (req, res) => {
  const courses = await getAllPendingCourseRequestService();
  res.status(200).json({ courses });
});
export const reviewCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { action } = req.body;

  const course = await reviewCourseService(courseId, action);

  res.status(200).json({
    message: `Course ${action}ed successfully`,
    course,
  });
});
