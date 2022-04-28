const { failedRes } = require('../utils/response');
const { cloudinary_name, cloudinary_api_key, cloudinary_api_secret } = require('./env');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

exports.upload_image = async (imagePath, imageName, tag) => {
  const img = await cloudinary.uploader.upload(
    imagePath,
    {
      public_id: `assets/${tag}/${imageName}`,
      overwrite: true,
      tags: `${tag}`,
    },
    function (err, image) {
      if (err) throw new Error('An error has been occurred when uploading a photo');
    }
  );
  if (fs.existsSync(imagePath)) {
    fs.rmSync(imagePath);
  }
  return img.url;
};
