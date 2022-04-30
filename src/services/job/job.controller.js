const { jobModel } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.getJobs = async (req, res) => {
  const username = res.locals.username;
  const q = req.query;
  try {
    const doc = await jobModel.find(q).sort('-createdAt');
    if (doc && doc.length && doc.length > 0) {
      for (let i = 0; i < doc.length; i++) {
        if (username == doc[i].username)
          doc[i] = await doc[i].populate('submissions');
      }
    } else{
      if (username == doc.username) doc = await doc.populate('submissions');
    }

    return successfulRes(res, 200, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.getJob = async (req, res) => {
  const _id = req.params.id;
  const username = res.locals.username;
  try {
    const doc = await jobModel.findById(_id).exec();
    if (username == doc.username) doc = await doc.populate('submissions');
    return successfulRes(res, 200, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.addJob = async (req, res) => {
  const username = res.locals.username;
  const {
    title,
    experience,
    job_type,
    location,
    categories,
    requirements,
    skills_tools,
    description,
    app_title,
    app_ques
  } = req.body;

  try {
    const doc = new jobModel({
      title,
      username,
      experience,
      job_type,
      location,
      categories,
      requirements,
      skills_tools,
      description,
      app_title,
      app_ques
    });
    await doc.save();
    return successfulRes(res, 201, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.updateJob = async (req, res) => {
  const _id = req.params.id;
  const username = res.locals.username;
  const {
    title,
    experience,
    job_type,
    location,
    categories,
    requirements,
    skills_tools,
    description,
    app_title,
    app_ques
  } = req.body;
  try {
    const doc = await jobModel.findById(_id).exec();
    if (doc.username != username) {
      throw new Error('You are NOT authorized to update this job');
    }

    doc.title = title ? title : doc.title;
    doc.experience = experience ? experience : doc.experience;
    doc.job_type = job_type ? job_type : doc.job_type;
    doc.location = location ? location : doc.location;
    doc.categories = categories ? categories : doc.categories;
    doc.requirements = requirements ? requirements : doc.requirements;
    doc.skills_tools = skills_tools ? skills_tools : doc.skills_tools;
    doc.description = description ? description : doc.description;

    if (!doc.application) {
      doc.application = { title: null, questions: [] };
    }
    doc.application.title = app_title ? app_title : doc.application.title;
    doc.application.questions = app_ques ? app_ques : doc.application.questions;

    const valid = doc.validateSync();
    if (valid) throw valid;
    await doc.save();
    return successfulRes(res, 201, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.deleteJob = async (req, res) => {
  const _id = req.params.id;
  try {
    const app = await jobModel.findById(_id).exec();

    if (!app.username == username) {
      throw new Error('You are NOT authorized to delete this job');
    }
    const doc = await jobModel.findByIdAndDelete(_id).exec();

    return successfulRes(res, 200, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};
