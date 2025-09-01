import express from 'express';

import { enrollCourse, verifyPayment } from './enrollment.controller.js';
import { authenticated } from '../../middlewares/authentication.js';

const router = express.Router();

router.post('/:courseId/enroll', authenticated, enrollCourse);
router.post('/:enrollmentId/verify-payment', authenticated, verifyPayment);

export default router;
