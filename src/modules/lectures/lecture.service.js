import Course from '../courses/course.model.js';

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

export const updateLectureService = async (courseId, lectureId, lectureData) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const lecture = course.lectures.id(lectureId);
    if (!lecture) {
      throw new Error('Lecture not found');
    }
    Object.assign(lecture, lectureData);
    await course.save();

    return course;
  } catch (error) {
    throw error;
  }
};

export const getAllLectureService = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    return course.lectures;
  } catch (error) {
    throw error;
  }
};

export const deleteLectureService = async (courseId, lectureId) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const lecture = course.lectures.id(lectureId);
    if (!lecture) {
      throw new Error('Lecture not found');
    }

    course.lectures.pull(lecture);
    await course.save();

    return course;
  } catch (error) {
    throw error;
  }
};
