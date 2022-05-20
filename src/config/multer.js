const multer  = require('multer')

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