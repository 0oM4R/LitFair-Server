const {companyProfile, companyInfo} = require('./model');
const { upload_image } = require('../../config/cloudinary');
const { successfulRes, failedRes } = require('../../utils/response');

exports.getCompaniesFull = async (req, res) => {
  let username = req.query;
  let response = [];
  try {

    const profile = await companyProfile.findAll(where:{});
    const info = await companyInfo.find().exec();
    for(let i=0; i<profile.length && i<info.length; i++){
      
    }

    return successfulRes(res, 200, );
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.getCompanyProfile = async (req, res) => {
  try {
    const username = req.params.username;
    let profile = companyProfile 

    await response.save();

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addCompany = async (req, res) => {
  try {
    // const user_id = res.locals.user.id;
    const { name, about, writer, cat, type, paragraphs } = req.body;
    const files = req.files;

    const saved = new Company({
      name,
      about,
      author: writer,
      cat,
      type,
      icon: 'NULL',
      img: 'NULL',
      paragraphs: paragraphs?.map((e) => ({ title: e.split(',')[0], Company: e.split(',')[1] })),
    });
    await saved.save();

    if (files) {
      let photos = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await upload_image(file.path, `${saved._id}_${i}`, 'Companys_thumbs');
        photos.push(url);
      }
      saved.icon = photos[0];
      saved.img = photos[1];
    }
    await saved.save();

    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const role = res.locals.user.role;

    const _id = req.params.id;
    const { name, writer, cat, type, paragraphs } = req.body;
    const files = req.files;

    let doc = await Company.findById(_id).exec();
    if (files) {
      let photos = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await upload_image(file.path, `${doc._id}_${i}`, 'Companys_thumbs');
        photos.push(url);
      }
      doc.icon = photos[0] ? photos[0] : doc.icon;
      doc.img = photos[1] ? photos[1] : doc.img;
    }

    doc.name = name ? name : doc.name;
    doc.author = writer ? writer : doc.author;
    doc.cat = cat ? cat : doc.cat;
    doc.type = type ? type : doc.type;
    doc.paragraphs = paragraphs ? paragraphs?.map((e) => ({ title: e.split(',')[0], Company: e.split(',')[1] })) : doc.paragraphs;

    await doc.save();

    return successfulRes(res, 200, doc);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Company.findByIdAndDelete(_id).exec();

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.shareCompany = async (req, res) => {
  try {
    const _id = req.params.id;
    let response = await Company.findById(_id).exec();
    const guestCookie = res.locals.guestCookie;

    if (guestCookie.shareCompanys.indexOf(_id) < 0) {
      guestCookie.shareCompanys.push(_id);
      res.cookie('__GuestId', JSON.stringify(guestCookie), {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
        sameSite: 'none',
        secure: true,
      });
      response.numberOfShare += 1;
    }

    await response.save();

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};