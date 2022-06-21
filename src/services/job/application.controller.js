const amqp = require('amqplib/callback_api');
const fs = require('fs');
const { appModel, jobModel } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');
const { upload_video, folderNames } = require('../../config/cloudinary');
const { MQ_URL, PUBLISH_VIDEOMQ_NAME } = require('../../config/env');

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
                $lookup: {
                    from: 'CompanyInfo',
                    localField: 'jop_post.company_id',
                    foreignField: '_id',
                    as: 'company_info'
                }
            },
            // {
            //     $replaceRoot: {
            //         newRoot: {
            //             $mergeObjects: [
            //                 {
            //                     $arrayElemAt: ['$job_post', 0]
            //                 },
            //                 {
            //                     $arrayElemAt: ['$company_info', 0]
            //                 },
            //                 '$$ROOT'
            //             ]
            //         }
            //     }
            // },
            {
                $project: { company_id: 1, 'company_info.logo': 1, 'job_post.title': 1, 'job_post.job_type': 1, 'job_post.location': 1 }
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
    const { text_question, text_answers, cv_url } = req.body;
    try {
        const doc = new appModel({
            applicant_id: user.id,
            job_post: job_id,
            cv_url
        });
        doc.text_answers = text_question.map((e, i) => {
            return {
                question: e,
                answers: text_answers[i]
            };
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

exports.submitVideo = async (req, res) => {
    const file = req.file;
    const user = req.user;
    const app_id = req.params.app_id;
    const { video_question, video_answer } = req.body;
    try {
        const url = await upload_video(file.path, `video_ud-${user.id}-${Date.now()}`, folderNames.interviewFolder);
        const appDoc = await appModel.findById(app_id).exec();
        if (appDoc) {
            appDoc.video_answers.push({
                question: video_question,
                video_url: url,
                report: 'Analyzing by AI...'
            });
            sendVideoMsg(url, video_question, user.id);
            if (fs.existsSync(videoPath)) {
                fs.rmSync(videoPath);
            }
            await appDoc.save();
        }
        return successfulRes(res, 200, 'Video uploaded successfully');
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

const sendVideoMsg = (videoPath, question, userId) => {
    const msg = {
        videoPath,
        question,
        userId
    };
    amqp.connect(MQ_URL, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(PUBLISH_VIDEOMQ_NAME, {
                durable: false
            });

            channel.sendToQueue(PUBLISH_VIDEOMQ_NAME, Buffer.from(JSON.stringify(msg)), {
                persistent: true
            });

            console.log(`A job sent successfully`);
        });
        setTimeout(function () {
            connection.close();
        }, 500);
    });
};
