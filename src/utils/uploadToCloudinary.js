import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import getEnvVar from './getEnvVars.js';

cloudinary.v2.config({
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_API_KEY'),
  api_secret: getEnvVar('CLOUDINARY_SECRET'),
});

export const uploadToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path, {
    folder: 'stories',
    resource_type: 'image',
  });

  await fs.unlink(file.path);
  return response.secure_url;
};
