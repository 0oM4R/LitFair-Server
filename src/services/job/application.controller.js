const { appModel } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.getApps = async (req, res) => {
    const user = req.user;

    try {
        const doc = await appModel.aggregate([
            {
                $match: { applicant_id: user.id }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jop_post',
                    foreignField: '_id',
                    as: 'job_post'
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$job_post', 0] }, '$$ROOT'] } }
            },
            {
                $project: { job_post: 0 }
            }
        ]);

        return successfulRes(res, 200, doc);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.getApp = async (req, res) => {
    const user = req.user;
    const app_id = req.params.id;
    try {
        const doc = await appModel.find({ _id: app_id, applicant_id: user.id }).populate('job_post');

        return successfulRes(res, 200, doc);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.submitApp = async (req, res) => {
    const user = req.user;
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
    const app_id = req.params.id;
    const user = req.user;

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
