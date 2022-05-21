const { appModel } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.getApps = async (req, res) => {
  const user = res.locals.user;
  console.log(user)
  try {
    const doc = await appModel.find({ applicant_id: user.id }).exec();

    return successfulRes(res, 200, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.submitApp = async (req, res) => {
  const user = res.locals.user;
  const job_id = req.params.job_id;
  const { answers } = req.body;
  try {
    const doc = new appModel({
      applicant_id: user.id,
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
  const user = res.locals.user;

  try {
    const app = await appModel.findById(app_id).exec();

    if (!app.applicant_id == user.id) {
      throw new Error('You are NOT authorized to delete this application');
    }
    const doc = await appModel.findByIdAndDelete(app_id).exec();
    return successfulRes(res, 200, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};
