import Course from './course.model.js';

export const createCourseService = async (data) => {
  try {
    const newCourse = await Course.create(data);
    return newCourse;
  } catch (error) {
    throw error;
  }
};

export const updateCourseService = async (courseId, data) => {
  try {
    const updateData = { ...data };
    const course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
    return course;
  } catch (error) {
    throw error;
  }
};

export const requestPublishService = async (courseId, instructorId) => {
  const course = await Course.findOne({ _id: courseId, instructor: instructorId });
  if (!course) throw new Error('Course not found or unauthorized');

  if (course.status !== 'draft' && course.status !== 'rejected') {
    throw new Error('Course already submitted or published');
  }

  course.status = 'pending_approval';
  await course.save();
  return course;
};

export const getCourseService = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    return course;
  } catch (error) {
    throw error;
  }
};

export const getAllCourseService = async (user, filters) => {
  let query = {};

  if (user.role === 'student') {
    query.status = 'published';
  } else if (user.role === 'instructor') {
    query.instructor = user.id;
  } else if (user.role === 'admin') {
    query = {}; // can see all
  }

  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } },
      { tags: { $regex: filters.search, $options: 'i' } },
    ];
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.level) {
    query.level = filters.level;
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
  }

  return await Course.find(query).populate('instructor', 'name email');
};

export const deleteCourseService = async (courseId) => {
  try {
    await Course.findByIdAndDelete(courseId);
  } catch (error) {
    throw error;
  }
};
