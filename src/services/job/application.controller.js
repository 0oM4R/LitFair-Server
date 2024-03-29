const amqp = require('amqplib/callback_api');
const fs = require('fs');
const axios = require('axios');
const { appModel, jobModel } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');
const { upload_video, folderNames } = require('../../config/cloudinary');
const { MQ_URL, PUBLISH_VIDEOMQ_NAME, PUBLISH_CVMQ_NAME } = require('../../config/env');
const { SeekerDetails } = require('../seeker/model-seeker');
const path = require('path');
const { smtpMail } = require('../../utils/smtp');
const { User_model } = require('../User/model-User');
const { companyProfile } = require('../company/model');

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
                $lookup: { from: 'jobs', localField: 'job_post', foreignField: '_id', as: 'job_post' }
            },
            {
                $lookup: {
                    from: 'companyinfos',
                    localField: 'job_post.company_id',
                    foreignField: '_id',
                    as: 'company_info'
                }
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
        const usr = await SeekerDetails.findById(user.id).exec();
        if (usr.appliedJobs.includes(job_id)) return failedRes(res, 401, new Error('You have already applied to this job'));
        const company_doc = await jobModel.findById(job_id).exec();

        const doc = new appModel({
            applicant_id: user.id,
            job_post: job_id,
            company_id: company_doc.company_id,
            cv_url
        });
        doc.text_answers = text_question.map((e, i) => {
            return {
                question: e,
                answers: text_answers[i]
            };
        });
        doc.progress.app_submitted = true;
        usr.appliedJobs.push(job_id);
        const savedUsr = await usr.save();
        await doc.save();

        if(cv_url){
            const splitted = cv_url.split('/upload/');
            const downloadUrl = splitted[0]+'/upload/fl_attachment/'+splitted[1];
            axios.get(downloadUrl, { responseType: 'blob' })
            .then((response) => {
                const filePath = path.join(__dirname, '../../../tmp/files/', `${user.id}.pdf`);
                if(!fs.existsSync(path.join(__dirname, '../../../tmp/files/'))){
                    fs.mkdirSync(path.join(__dirname, '../../../tmp/files/'));
                }
                fs.writeFile(path.resolve(filePath), response.data, (err) => {
                    if(err) throw err;
                    console.log('The file has been saved!');
                    analyzeCv(filePath, doc._id, company_doc.skills_tools);
                })
            })
        }
        return successfulRes(res, 201, { applicatoin: doc, user_appliedJobs: savedUsr.appliedJobs });
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.deleteApp = async (req, res) => {
    const app_id = req.params.app_id;
    const user = req.user;

    try {
        const app = await appModel.findById(app_id).exec();

        if (!app) return failedRes(res, 404, new Error(`Can NOT find application with id-${app_id}`));

        if (app.applicant_id != user.id) {
            return failedRes(res, 401, new Error('You are NOT authorized to delete this application'));
        }
        const doc = await appModel.findByIdAndDelete(app_id).exec();
        const usr = await SeekerDetails.findById(user.id).exec();
        const remJobs = [];
        usr.appliedJobs.forEach((e) => {
            if (e != app.job_post) remJobs.push(e);
        });
        usr.appliedJobs = remJobs;
        await usr.save();
        return successfulRes(res, 200, doc);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.feedbackMocking = async (req, res) => {
    try {
        const app_id = req.params.app_id;
        const { feedback } = req.body;
        const doc = await appModel.findByIdAndUpdate(
            app_id,
            {
                feedback_1: feedback
            },
            { new: true }
        );
        return successfulRes(res, 200, doc);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.submitFeedback = async (req, res) => {
    try {
        const app_id = req.params.app_id;
        const { feedback } = req.body;
        const user = req.user;

        const doc = await appModel.findById(app_id).exe();
        if (user.id != doc.company_id) return failedRes(res, 401, new Error('You are NOT authorized to add feedback to this application'));
        doc.feedback_2 = feedback;
        await doc.save();

        return successfulRes(res, 201, response);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.feedbackEmail = async (req, res) => {
    try {
        const job_id = req.params.job_id;
        const { user_id, email_subject, email_body } = req.body;
        const user = req.user;
        const { hr_inter, user_state } = req.query;

        if (!hr_inter && !user_state) return failedRes(res, 400, new Error(`Provide a valid query value`));

        if (!user_id) return failedRes(res, 400, new Error(`You Must provide user_id`));

        const job = await jobModel.findById(job_id).exec();
        if (!job) return failedRes(res, 404, new Error(`JOB with [ID: ${job_id}] NOT FOUND`));
        if (job.company_id != user.id) return failedRes(res, 401, `You DO NOT have permission to access this job`);

        const seeker = await User_model.findOne({ where: { id: user_id } });
        if (!seeker) return failedRes(res, 404, new Error(`Applicant with [ID: ${user_id}] NOT FOUND`));
        const company = await companyProfile.findOne({ where: { id: user.id } });

        const info = await smtpMail(seeker.email, company.name, user.email, email_subject, email_body);

        if (hr_inter) {
            await appModel.findOneAndUpdate({ applicant_id: user_id }, { 'progress.hr_inter': true });
        } else if (user_state) {
            await appModel.findOneAndUpdate({ applicant_id: user_id }, { user_state: `${user_state}` });
        }

        return successfulRes(res, 200, { response: info.response, from: info.envelope.from, to: info.envelope.to[0] });
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
        // const url = await upload_video(file.path, `video_ud-${user.id}-${Date.now()}`, folderNames.interviewFolder);

        const appDoc = await appModel.findById(app_id).exec();
        if (appDoc) {
            appDoc.progress.live_inter = true;
            appDoc.video_answers.push({
                question: video_question,
                video_url: path.resolve(file.path),
                report: 'Analyzing by AI...'
            });

            sendVideoMsg(path.resolve(file.path), video_question, app_id);
            // if (fs.existsSync(videoPath)) {
            //     fs.rmSync(videoPath);
            // }
            await appDoc.save();
        }
        return successfulRes(res, 200, 'Video uploaded successfully');
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

const sendVideoMsg = (videoPath, question, appId) => {
    const msg = {
        path: videoPath,
        _id: {
            question,
            appId
        }
    };
    // const msg = {
    //     _id: {videoPath, question, appId},
    //     predictions: {
    //     Excited: 1.5,
    //     Engaged: 1.5,
    //     Smiled: 1.5,
    //     RecommendHiring: 1.5,
    //     NoFillers: 1.5,
    //     StructuredAnswers: 1.5,
    //     Friendly: 1.5,
    //     Focused: 1.5,
    //     NotAwkward: 1.5,
    //     Paused: 1.5,
    //     EyeContact: 1.5,
    //     Authentic: 1.5,
    //     Calm: 1.5,
    //     SpeakingRate: 1.5,
    //     NotStressed: 1.5}
    // }

    amqp.connect(MQ_URL, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(PUBLISH_VIDEOMQ_NAME, {
                durable: true
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

const analyzeCv = (cvPath, _appicationid, jobSkills) => {
    const msg = {
        _appicationid,
        cvPath,
        jobSkills
    };

    amqp.connect(MQ_URL, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(PUBLISH_CVMQ_NAME, {
                durable: true
            });

            channel.sendToQueue(PUBLISH_CVMQ_NAME, Buffer.from(JSON.stringify(msg)), {
                persistent: true
            });

            console.log(`A CV sent successfully`);
        });
        setTimeout(function () {
            connection.close();
        }, 500);
    });
};
