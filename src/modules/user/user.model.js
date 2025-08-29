import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },

    profileImage: { type: String, default: '' },
    bio: { type: String, maxlength: 500 },
    phone: { type: String, trim: true },

    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    teachingCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

    progress: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        completedLectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
        percentage: { type: Number, default: 0 },
      },
    ],

    socialLinks: {
      linkedin: String,
      twitter: String,
      website: String,
    },
    instructorRequest: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: null,
      },
      appliedAt: { type: Date },
      reviewedAt: { type: Date },
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin
    },
    isVerified: { type: Boolean, default: false },
    refreshTokens: [{ token: String, createdAt: { type: Date, default: Date.now } }],
  },
  { timestamps: true }
);

// pre hook for admin check
userSchema.pre('save', async function (next) {
  if (this.role === 'ADMIN') {
    const adminExists = await this.constructor.findOne({ role: 'ADMIN' });
    if (adminExists) {
      throw new Error('Admin user already exists. Cannot create another.');
    }
  }
  next();
});

/**
 * Pre-save hook for password hashing
 */

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await argon2.hash(this.password, { type: argon2.argon2id });
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Compare password method
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await argon2.verify(this.password, candidatePassword);
};

/**
 * Remove sensitive fields when converting to JSON
 */
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);
export default User;
