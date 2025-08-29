import connectDb from '../shared/db.js';
import User from '../modules/user/user.model.js';
import { logger } from '../shared/logger.js';
import dotenv from 'dotenv';
dotenv.config();

const admin = async () => {
  await connectDb();

  const exist = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (exist) {
    logger.info('Admin already exists');
    process.exit(0);
  }
  const admin = new User({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: 'admin',
  });
  await admin.save();
  logger.info('Admin user created successfully');
  process.exit(0);
};
admin();
