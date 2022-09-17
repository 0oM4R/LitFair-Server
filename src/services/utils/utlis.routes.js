const { upload_image, upload_video, upload_raw } = require('../../config/cloudinary');
const { photoUpload, videoUpload, upload } = require('../../config/multer');
const { jwtStrategy } = require('../../middleware/passport');
const { failedRes, successfulRes } = require('../../utils/response');
const fs = require('fs');

const router = require('express').Router();

router.post('/upload-photo', jwtStrategy, photoUpload.single('photo'), async (req, res) => {
    try {
        const file = req.file;
        const user = req.user;
        const folderName = req.body.folderName ? req.body.folderName : 'photos';
        const photoName = `${new Date().toISOString()}-${user.id}`;

        const url = await upload_image(file.path, photoName, folderName);
        if (fs.existsSync(file.path)) {
            fs.rmSync(file.path);
        }
        return successfulRes(res, 200, { photo_url: url });
    } catch (e) {
        return failedRes(res, 500, e);
    }
});

router.post('/upload-video', jwtStrategy, videoUpload.single('video'), async (req, res) => {
    try {
        const file = req.file;
        const user = req.user;
        const folderName = req.body.folderName ? req.body.folderName : 'videos';
        const videoName = `${new Date().toISOString()}-${user.id}`;

        const url = await upload_video(file.path, videoName, folderName);
        if (fs.existsSync(file.path)) {
            fs.rmSync(file.path);
        }
        return successfulRes(res, 200, { video_url: url });
    } catch (err) {
        return failedRes(res, 500, err);
    }
});

router.post('/upload-file', jwtStrategy, upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const user = req.user;
        const folderName = req.body.folderName ? req.body.folderName : 'files';
        const fileName = `${new Date().toISOString()}-${user.id}`;

        const url = await upload_raw(file.path, fileName, folderName);
        if (fs.existsSync(rawPath)) {
            fs.rmSync(rawPath);
        }
        if (fs.existsSync(file.path)) {
            fs.rmSync(file.path);
        }
        return successfulRes(res, 200, { file_url: url, original_name: file.originalname });
    } catch (err) {
        return failedRes(res, 500, err);
    }
});

module.exports = router;
