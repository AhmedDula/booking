const cloudinary = require('cloudinary').v2;
const { cloudinary: cloudinaryEnv } = require('./env');

if (cloudinaryEnv.cloudName) {
  cloudinary.config({
    cloud_name: cloudinaryEnv.cloudName,
    api_key: cloudinaryEnv.apiKey,
    api_secret: cloudinaryEnv.apiSecret,
  });
} else {
  // Not fatal — lets you develop other modules before Cloudinary keys exist.
  // Upload routes will fail clearly if hit without config.
  console.warn('[cloudinary] No CLOUDINARY_CLOUD_NAME set — image uploads will fail until configured.');
}

module.exports = cloudinary;