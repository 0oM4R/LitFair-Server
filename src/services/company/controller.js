<<<<<<< HEAD
const { companyProfile, companyInfo } = require('./model');
// const { upload_image } = require('../../config/cloudinary');
const { successfulRes, failedRes } = require('../../utils/response');

exports.getCompaniesFull = async (req, res) => {
  let response =  [];
  try {
    const profiles = await companyProfile.findAll();
    const infos = await companyInfo.find().exec();
    for (const profx in profiles) {
      for (const infox in infos) {
        if (profiles[profx].username == infos[infox].username) {
          response.push({ profile: profiles[profx], info: infos[infox] });
          infos.splice(infox, 1);
          break;
        }
      }
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.getCompanyFull = async (req, res) => {
  const username = req.params.username;
  let response = { profile: 'null', info: 'null' };
  try {
    const profile = await companyProfile.findOne({ where: { username } });
    if (profile) {
      const info = await companyInfo.findOne({ username }).exec();
      response = { profile, info };
    }
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addCompanyFull = async (req, res) => {
  // const username = res.locals.username;
  const username = res.params.username;
  const {
    name,
    nationality,
    company_size,
    verified,
    phone_number,
    email,
    title,
    description,
    social_links,
    CRN_num,
    CRN_exp
  } = req.body;
  let response = { profile: 'null', info: 'null' };

  const files = req.files;
  try {
    const profile = await companyProfile.build({
      username,
      name,
      nationality,
      company_size,
      verified,
      phone_number,
      email,
      title
    });

    await profile.save();

    let info = new companyInfo({
      username,
      logo: 'NULL',
      description,
      social_links,
      CRN: { number: CRN_num, thumbnail: 'NULL', expDate: CRN_exp }
    });

    if (files) {
      info.logo = files[0]
        ? await upload_image(files[0], `${info._id}_logo`, 'Companies_logos')
        : undefined;
      info.CRN.thumbnail = files[1]
        ? await upload_image(files[1], `${info._id}_CRN`, 'Companies_CRN')
        : undefined;
    }
    await info.save();

    response = { profile, info };
    return successfulRes(res, 201, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.updateCompanyFull = async (req, res) => {
  // const username = res.locals.username;
  const username = res.params.username;
  
  const {
    name,
    nationality,
    company_size,
    verified,
    phone_number,
    email,
    title,
    description,
    social_links,
    CRN_num,
    CRN_exp
  } = req.body;
  const files = req.files;
  let response = { profile: 'null', info: 'null' };
  try {
    // prettier-ignore
    if (name ||nationality ||company_size ||
      verified ||phone_number || email ||title) {
      const profile = await companyProfile.findOne({ where: { username } });
      profile.name = name ? name : profile.name;
      profile.nationality = nationality ? nationality : profile.nationality;
      profile.company_size = company_size ? company_size : profile.company_size;
      profile.verified = verified ? verified : profile.verified;
      profile.phone_number = phone_number ? phone_number : profile.phone_number;
      profile.email = email ? email : profile.email;
      profile.title = title ? title : profile.title;

      await profile.save();
      response.profile = profile;
    }

    if (description || social_links || CRN_num || CRN_exp) {
      const info = await companyInfo.findOne({ username }).exec();

      info.description = description ? description : info.description;
      info.social_links = social_links ? social_links : info.social_links;

      let dummy_CRN = {
        number: info.CRN?.number,
        thumbnail: info.CRN?.thumbnail,
        expDate: info.CRN?.expDate
      };

      if (files) {
        info.logo = files[0]
          ? await upload_image(files[0], `${info._id}_logo`, 'Companies_logos')
          : info.logo;
        dummy_CRN.thumbnail = files[0]
          ? await upload_image(files[1], `${info._id}_CRN`, 'Companies_CRN')
          : dummy_CRN.thumbnail;
      }

      dummy_CRN.number = CRN_num ? CRN_num : dummy_CRN.number;
      dummy_CRN.thumbnail = CRN_num ? CRN_num : dummy_CRN.number;
      info.CRN = dummy_CRN ? dummy_CRN : info.CRN;

      info.save();
      response.info = info;
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteCompanyFull = async (req, res) => {
  // const username = res.locals.username;
  const username = res.params.username;
  let response = { profile: 'null', info: 'null' };
  try {
    const profile = await companyProfile.destroy({ where: { username } });
    if (profile) {
      const info = await companyInfo.findOneAndDelete({ username }).exec();
      response = { profile, info };
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
=======
const { companyProfile, companyInfo } = require('./model');
// const { upload_image } = require('../../config/cloudinary');
const { successfulRes, failedRes } = require('../../utils/response');

exports.getCompaniesFull = async (req, res) => {
  let response = [];
  try {
    const profiles = await companyProfile.findAll();
    const infos = await companyInfo.find().exec();
    for (const profx in profiles) {
      for (const infox in infos) {
        if (profiles[profx].id == infos[infox]._id) {
          response.push({ profile: profiles[profx], info: infos[infox] });
          infos.splice(infox, 1);
          break;
        }
      }
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.getCompanyFull = async (req, res) => {
  const user = req.params.user;
  let response = { profile: 'null', info: 'null' };
  try {
    const profile = await companyProfile.findOne({ where: { id: user.id } });
    if (profile) {
      let info = await companyInfo.findById(profile.id).exec();
      info = await info.populate('posted_job');
      response = { profile, info };
    }
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addCompanyFull = async (req, res) => {
  const user = res.params.user;
  const {
    name,
    nationality,
    company_size,
    verified,
    phone_number,
    email,
    title,
    CRN_num,
    CRN_exp,
    description,
    social
  } = req.body;
  let response = { profile: 'null', info: 'null' };

  const files = req.files;
  try {
    const profile = await companyProfile.build({
      id: user.id,
      name,
      nationality,
      company_size,
      verified,
      phone_number,
      email,
      title
    });

    await profile.save();

    let info = new companyInfo({
      _id: user.id,
      CRN: { number: CRN_num, thumbnail: 'NULL', exp_date: CRN_exp },
      logo: 'NULL',
      description,
      social
    });

    if (files) {
      info.logo = files[0]
        ? await upload_image(files[0], `${info._id}_logo`, 'Companies_logos')
        : 'null';
      info.CRN.thumbnail = files[1]
        ? await upload_image(files[1], `${info._id}_CRN`, 'Companies_CRN')
        : 'null';
    }
    await info.save();

    response = { profile, info };
    return successfulRes(res, 201, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.updateCompanyFull = async (req, res) => {
  const user = res.locals.user;

  const {
    name,
    nationality,
    company_size,
    verified,
    phone_number,
    email,
    title,
    CRN_num,
    CRN_exp,
    description,
    social
  } = req.body;
  const files = req.files;
  let response = { profile: 'null', info: 'null' };
  try {
    // prettier-ignore
    if (name ||nationality ||company_size ||
      verified ||phone_number || email ||title) {
      const profile = await companyProfile.findOne({ where: { id: user.id } });
      profile.name = name ? name : profile.name;
      profile.nationality = nationality ? nationality : profile.nationality;
      profile.company_size = company_size ? company_size : profile.company_size;
      profile.verified = verified ? verified : profile.verified;
      profile.phone_number = phone_number ? phone_number : profile.phone_number;
      profile.email = email ? email : profile.email;
      profile.title = title ? title : profile.title;

      await profile.save();
      response.profile = profile;
    }

    if (description || social || CRN_num || CRN_exp) {
      const info = await companyInfo.findById(user.id).exec();

      info.description = description ? description : info.description;
      info.social = social ? social : info.social;

      if (files) {
        info.logo = files[0]
          ? await upload_image(files[0], `${info._id}_logo`, 'Companies_logos')
          : info.logo;
        info.CRN.thumbnail = files[0]
          ? await upload_image(files[1], `${info._id}_CRN`, 'Companies_CRN')
          : info.CRN.thumbnail;
      }

      info.CRN.number = CRN_num ? CRN_num : info.CRN.number;
      info.CRN.exp_date = CRN_num ? CRN_num : info.CRN.exp_date;

      info.save();
      response.info = info;
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.deleteCompanyFull = async (req, res) => {
  const user = res.params.user;
  let response = { profile: 'null', info: 'null' };
  try {
    const profile = await companyProfile.destroy({ where: { id: user.id } });
    if (profile) {
      const info = await companyInfo.findByIdAndDelete(user.id).exec();
      response = { profile, info };
    }

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
>>>>>>> 8ffd8d9557e5e7374f6f6cd1314df5f51e2261fd
