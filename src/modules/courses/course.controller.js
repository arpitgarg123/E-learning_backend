import { imagekit } from '../../config/imagekit.js';
import { asyncHandler } from '../../shared/utlis/asyncHandler.js';
import { uploadToImageKit } from '../../shared/utlis/uploader.js';
import { addLectureService, createCourseService } from './course.service.js';

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
