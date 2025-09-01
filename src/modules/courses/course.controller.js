import { imagekit } from '../../config/imagekit.js';
import { asyncHandler } from '../../shared/utlis/asyncHandler.js';
import { uploadToImageKit } from '../../shared/utlis/uploader.js';
import {
  createCourseService,
  deleteCourseService,
  getAllCourseService,
  getCourseService,
  requestPublishService,
  updateCourseService,
} from './course.service.js';

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category, level, price, discount, tags } = req.body;
  if (!title || !description || !category || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const instructorId = req.user.id;
  let thumbnailUrl = '';
  if (req.file) {
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });
    thumbnailUrl = uploadResponse.url;
  }
  const course = await createCourseService({
    title,
    description,
    category,
    level,
    price,
    discount,
    tags,
    thumbnail: thumbnailUrl,
    instructor: instructorId,
  });

  res.status(201).json({
    message: 'Course created successfully',
    course,
  });
});

// Additional controllers like getCourse, updateCourse, deleteCourse can be added here
export const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, description, category, level, price, discount, tags } = req.body;
  let thumbnailUrl = '';
  if (req.file) {
    const uploadResponse = await uploadToImageKit(req.file);
    thumbnailUrl = uploadResponse.url;
  }
  const updatedCourse = await updateCourseService(courseId, {
    title,
    description,
    category,
    level,
    price,
    thumbnail: thumbnailUrl,
    discount,
    tags,
  });
  res.status(200).json({
    message: 'Course updated successfully',
    course: updatedCourse,
  });
});

export const requestPublishCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const instructorId = req.user.id;

  const course = await requestPublishService(courseId, instructorId);

  res.status(200).json({
    message: 'Course submitted for admin approval',
    course,
  });
});

export const getCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await getCourseService(courseId);
  res.status(200).json({
    message: 'Course retrieved successfully',
    course,
  });
});

export const getAllCourse = asyncHandler(async (req, res) => {
  const courses = await getAllCourseService(req.user, req.query);
  res.status(200).json({
    message: 'All courses retrieved successfully',
    courses,
  });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  await deleteCourseService(courseId);
  res.status(200).json({
    message: 'Course deleted successfully',
  });
});
