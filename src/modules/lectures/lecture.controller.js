import { asyncHandler } from '../../shared/utlis/asyncHandler.js';
import { uploadToImageKit } from '../../shared/utlis/uploader.js';
import {
  addLectureService,
  deleteLectureService,
  getAllLectureService,
  updateLectureService,
} from './lecture.service.js';

// adding the controller of adding lectures
export const addLecture = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, description, duration } = req.body;

  let videoUrl = '';
  if (req.file) {
    videoUrl = await uploadToImageKit(req.file);
  }

  const updatedCourse = await addLectureService(courseId, {
    title,
    description,
    videoUrl,
    duration,
  });

  res.status(200).json({
    message: 'Lecture added successfully',
    course: updatedCourse,
  });
});

// additional controllers like getLecture, updateLecture, deleteLecture can be added here
export const updateLecture = asyncHandler(async (req, res) => {
  const { courseId, lectureId } = req.params;
  const { title, description, duration } = req.body;

  const updatedCourse = await updateLectureService(courseId, lectureId, {
    title,
    description,
    duration,
  });

  res.status(200).json({
    message: 'Lecture updated successfully',
    course: updatedCourse,
  });
});

export const getAllLecture = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const lectures = await getAllLectureService(courseId);
  res.status(200).json({
    message: 'Lectures retrieved successfully',
    lectures,
  });
});

export const completeLecture = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.id;
  const completedLessons = await getCompletedLessonsService(courseId, studentId);
  res.status(200).json({
    message: 'Lecture completed successfully',
    progress: enrollment.progress,
  });
});

export const deleteLecture = asyncHandler(async (req, res) => {
  const { courseId, lectureId } = req.params;

  const updatedCourse = await deleteLectureService(courseId, lectureId);

  res.status(200).json({
    message: 'Lecture deleted successfully',
    course: updatedCourse,
  });
});
