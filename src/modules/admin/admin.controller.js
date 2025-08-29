import { asyncHandler } from '../../shared/utlis/asyncHandler.js';
import { getInstructorRequestsService, reviewInstructorRequestService } from './admin.service.js';

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
