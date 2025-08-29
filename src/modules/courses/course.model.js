import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String }, // Bunny/Video URL
  duration: { type: Number }, // in seconds
  resources: [{ type: String }], // PDF, docs, etc.
  order: { type: Number }, // order in the course
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },

    thumbnail: { type: String }, // ImageKit URL
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },

    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lectures: [lectureSchema],

    isPublished: { type: Boolean, default: false },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
