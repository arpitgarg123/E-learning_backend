import { imagekit } from '../../config/imagekit.js';

export const uploadToImageKit = async (file) => {
  try {
    const uploadedFile = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: 'edu-platform',
    });
    return uploadedFile.url;
  } catch (err) {
    throw new Error('Image upload failed: ' + err.message);
  }
};
