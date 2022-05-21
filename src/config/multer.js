const multer  = require('multer');
// create folders with path and check if it is exists in each storage method or create if it doesn't exists tmp then nested file\
//path join for all paths 
// delete when its uploaded to DB
// 
const path = require('path');
const CV_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/CV_uploads')
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, req.user.id+"cv.pdf")
    }
  })
  

const upload =multer(
    {
        fileFilter(req,file,cb){
            if(!file.originalname.match(/\.(pdf)$/ )){
                cb(new Error('only pdf files are allowed'))
            }
            cb(null,true);
        },
        storage : CV_storage
})
module.exports = {upload}