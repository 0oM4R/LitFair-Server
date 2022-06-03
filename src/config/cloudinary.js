const { failedRes } = require('../utils/response');
const {
  cloudinary_name,
  cloudinary_api_key,
  cloudinary_api_secret
} = require('./env');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret
});

exports.upload_video = async (videoPath, videoName, tag) => {
  const video = await cloudinary.uploader.upload(
    videoPath,
    {
      resource_type: "raw",
      public_id: `assets/${tag}/${videoName}`,
      overwrite: true,
      tags: `${tag}`
    },
    function (err, video) {
      if (err)
        throw new Error('An error has been occurred when uploading a video' + err);
    }
  );
  if (fs.existsSync(videoPath)) {
    fs.rmSync(videoPath);
  }
  return video;
  return img.url;
};
