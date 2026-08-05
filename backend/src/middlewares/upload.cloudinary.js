const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Custom minimal Cloudinary storage engine for Multer (v2 SDK compatible).
// Buffers the file in memory then streams it to Cloudinary — fine for the
// image sizes this app deals with (property photos, avatars).
class CloudinaryStorage {
  constructor({ folder = 'luxury-booking' } = {}) {
    this.folder = folder;
  }

  _handleFile(req, file, cb) {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: this.folder, resource_type: 'image' },
      (error, result) => {
        if (error) return cb(error);
        cb(null, {
          path: result.secure_url,
          filename: result.public_id,
          size: result.bytes,
        });
      }
    );
    file.stream.pipe(uploadStream);
  }

  _removeFile(req, file, cb) {
    cloudinary.uploader.destroy(file.filename, (err) => cb(err));
  }
}

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const isAllowed = allowed.test(file.mimetype);
  if (!isAllowed) return cb(new Error('Only jpeg, jpg, png, and webp images are allowed'));
  cb(null, true);
};

const upload = multer({
  storage: new CloudinaryStorage({ folder: 'luxury-booking/properties' }),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
});

module.exports = upload;