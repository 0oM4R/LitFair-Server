const { appModel } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.getApps = async (req, res) => {
  const username = res.locals.username;

  try {
    const doc = await appModel.find({ username }).exec();

    return successfulRes(res, 200, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.submitApp = async (req, res) => {
  const username = res.locals.username;
  const job_id = req.params.job_id;
  const { answers } = req.body;
  try {
    const doc = new appModel({
      username,
      job_post: job_id,
      answers
    });
    await doc.save();
    return successfulRes(res, 201, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.deleteApp = async (req, res) => {
  const app_id = req.params.app_id;
  const username = res.locals.username;

  try {
    const app = await appModel.findById(app_id).exec();

    if (!app.username == username) {
      throw new Error('You are NOT authorized to delete this application');
    }
    const doc = await appModel.findByIdAndDelete(_id).exec();
    return successfulRes(res, 200, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};
