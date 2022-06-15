const { failedRes } = require('../utils/response');
const { cloudinary_name, cloudinary_api_key, cloudinary_api_secret } = require('./env');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: cloudinary_name,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret
});

exports.folderNames = {
    cvFolder: 'cv',
    profileFolder: 'profile',
    interviewFolder: 'interview'
};

exports.upload_raw = async (rawPath, rawName, tag) => {
    const video = await cloudinary.uploader.upload(
        rawPath,
        {
            resource_type: 'raw',
            public_id: `litfair_media/${tag}/${rawName}`,
            overwrite: true,
            tags: `${tag}`
        },
        function (err, result) {
            console.log(result, err);
        }
    );
    if (fs.existsSync(rawPath)) {
        fs.rmSync(rawPath);
    }
    return video.url;
};

exports.upload_image = async (imagePath, imageName, tag) => {
    const video = await cloudinary.uploader.upload(
        videoPath,
        {
            resource_type: 'image',
            public_id: `litfair_media/${tag}/${imageName}`,
            overwrite: true,
            tags: `${tag}`
        },
        function (err, result) {
            console.log(result, err);
        }
    );
    if (fs.existsSync(imagePath)) {
        fs.rmSync(imagePath);
    }
    return video.url;
};

exports.upload_video = async (videoPath, videoName, tag) => {
    const video = await cloudinary.uploader.upload(
        videoPath,
        {
            resource_type: 'video',
            public_id: `litfair_media/${tag}/${videoName}`,
            overwrite: true,
            tags: `${tag}`
        },
        function (err, result) {
            console.log(result, err);
        }
    );

    //prevent delete file until send to message queue
    // if (fs.existsSync(videoPath)) {
    //     fs.rmSync(videoPath);
    // }
    return video.url;
};
