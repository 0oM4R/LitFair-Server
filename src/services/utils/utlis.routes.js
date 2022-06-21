const { upload_image } = require('../../config/cloudinary');
const { photoUpload, videoUpload } = require('../../config/multer');
const { jwtStrategy } = require('../../middleware/passport');
const { failedRes } = require('../../utils/response');

const router = require('express').Router();

router.post('/upload-photo', jwtStrategy, photoUpload.single('photo'), async (req, res) => {
    try {
        const file = req.file;
        const user = req.user;
        const { folderName } = req.body;
        const photoName = `${new Date().toISOString()}-${user.id}`;

        const url = await upload_image(file.path, photoName, folderName);
        if (fs.existsSync(file.path)) {
            fs.rmSync(file.path);
        }
        return successfulRes(res, 200, url);
    } catch (e) {
        return failedRes(res, 500, e);
    }
});

router.post('/upload-video', jwtStrategy, videoUpload.single('video'), async (req, res) => {
    try {
        const file = req.file;
        const user = req.user;
        const { folderName } = req.body;
        const videoName = `${new Date().toISOString()}-${user.id}`;

        const url = await upload_video(file.path, videoName, folderName);
        if (fs.existsSync(file.path)) {
            fs.rmSync(file.path);
        }
        return successfulRes(res, 200, url);
    } catch (err) {
        return failedRes(res, 500, err);
    }
});

module.exports = router;
