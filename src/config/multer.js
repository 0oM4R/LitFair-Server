const multer  = require('multer');
const fs = require('fs')
const path = require('path');
// create folders with path and check if it is exists in each storage method or create if it doesn't exists tmp then nested file\
//path join for all paths 
// delete when its uploaded to DB
// 
const cvPath= path.join('..','tmp', 'cv');
//const cvPath= '/tmp/CV';
const checkForFolder = (folderPath)=>{
    try{
      if(!fs.existsSync(folderPath)){
       fs.mkdirSync(folderPath,{recursive: true});
    }
  }catch(err){
    console.error(err)
  }
   
}

const CV_storage = multer.diskStorage({
    destination: function async (req, file, cb) {
      checkForFolder(cvPath)
      cb(null, cvPath)
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, req.user.id+".pdf")
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

const deleteFile = (filePate)=>{
  fs.unlink(filePate,(err)=>{
    if(err) console.log(err)
  })
}
const deleteFolder = (dir)=>{
  if(fs.existsSync(dir)){
    fs.rm(dir, {recursive: true},err => {
      if(err) console.log(err)
    })
 }
}
module.exports = {upload,deleteFolder,deleteFile}