import Course from './course.model.js';

export const createCourseService = async (data) => {
  try {
    const newCourse = await Course.create(data);
    return newCourse;
  } catch (error) {
    throw error;
  }
};

export const addLectureService = async (courseId, lectureData) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    lectureData.order = course.lectures.length + 1;

    course.lectures.push(lectureData);
    await course.save();

    return course;
  } catch (error) {
    throw error;
  }
};
