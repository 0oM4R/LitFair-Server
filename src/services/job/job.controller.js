const { jobModel } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');

exports.getJobs = async (req, res) => {
    const allowfilters = ['title', 'categories', 'all'];
    let query = {};
    try {
        let { filter = 'all', value, page = 1 } = req.query;

        if (!allowfilters.includes(filter)) throw new Error('Invalid filter');
        if (value) {
            const regex = Array.from(value.split(' '), (e) => new RegExp(e, 'si'));
            value ? (query[filter] = { $in: regex }) : null;
        }
        const skip = (page - 1) * 20;

        const doc = await jobModel.aggregate([
            {
                $match: query
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $project: { title: 1, experience: 1, job_type: 1, location: 1 }
            },
            {
                $facet: {
                    current_data: [{ $skip: skip }, { $limit: 20 }],
                    page_info: [{ $count: 'total_pages' }, { $addFields: { page: page } }]
                }
            }
        ]);

        return successfulRes(res, 200, doc);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.getJob = async (req, res) => {
    const _id = req.params.id;
    const user = req.user;
    try {
        let doc = await jobModel.findById(_id).exec();
        if (user.id == doc.company_id) doc = await doc.populate('submissions');
        return successfulRes(res, 200, doc);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.addJob = async (req, res) => {
    const user = req.user;
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
        app_description,
        app_text_questions,
        app_video_questions
    } = req.body;

    try {
        const doc = new jobModel({
            company_id: user.id,
            title,
            experience,
            job_type,
            location,
            categories,
            requirements,
            skills_tools,
            description,
            application: {
                title: app_title,
                description: app_description,
                text_questions: app_text_questions,
                video_questions: app_video_questions
            }
        });
        await doc.save();
        return successfulRes(res, 201, doc);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.updateJob = async (req, res) => {
    const _id = req.params.id;
    const user = req.user;
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
        app_description,
        app_text_questions,
        app_video_questions
    } = req.body;
    try {
        const doc = await jobModel.findById(_id).exec();
        if (doc.company_id != user.id) {
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
        doc.application.title = app_title ? app_title : doc.application.title;
        doc.application.description = app_description ? app_description : doc.application.description;
        doc.application.text_questions = app_text_questions ? app_text_questions : doc.application.text_questions;
        doc.application.video_questions = app_video_questions ? app_video_questions : doc.application.video_questions;
        

        const valid = doc.validateSync();
        if (valid) throw valid;
        await doc.save();
        return successfulRes(res, 200, doc);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};

exports.deleteJob = async (req, res) => {
    const _id = req.params.id;
    const user = req.user;
    try {
        const job = await jobModel.findById(_id).exec();

        if (!job.company_id == user.id) {
            throw new Error('You are NOT authorized to delete this job');
        }
        const doc = await jobModel.findByIdAndDelete(_id).exec();

        return successfulRes(res, 200, doc);
    } catch (err) {
        return failedRes(res, 500, err);
    }
};
