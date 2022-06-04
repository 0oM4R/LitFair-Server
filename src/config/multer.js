const multer = require('multer');
const fs = require('fs');
const path = require('path');

const cvPath = path.join('tmp', 'cv');

const checkForFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const deleteFile = (filePate) => {
  fs.unlink(filePate, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const deleteFolder = (dir) => {
  if (fs.existsSync(dir)) {
    fs.rm(dir, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
  }
};

const CV_storage = multer.diskStorage({
  destination: function async(req, file, cb) {
    checkForFolder(cvPath);
    cb(null, cvPath);
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + '.pdf');
  }
});

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      cb(new Error('only pdf files are allowed'));
    }
    cb(null, true);
  },
  storage: CV_storage
});

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tmpPath = path.join('tmp', 'videos');

    if (!fs.existsSync(tmpPath)) {
      fs.mkdirSync(tmpPath, { recursive: true });
    }
    cb(null, tmpPath);
  },
  filename: function (req, file, cb) {
    const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquePreffix + file.originalname);
  }
});

const videoUpload = multer({ storage: videoStorage });

module.exports = { videoUpload, upload, deleteFolder, deleteFile };
