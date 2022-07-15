const ObjectId = require('mongoose').Types.ObjectId;
const { companyProfile, companyInfo } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');
const { appModel, jobModel } = require('../job/model');
const { SeekerBaseInfo, SeekerDetails } = require('../seeker/model-seeker');

exports.getCompaniesFull = async (req, res) => {
    let response = [];
    try {
        const profiles = await companyProfile.findAll({
            attributes: ['id', 'name', 'nationality', 'verified']
        });
        const infos = await companyInfo.aggregate([
            {
                $sort: { createdAt: -1 }
            },
            {
                $project: { _id: 1, logo: 1, description: 1 }
            }
        ]);
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
    const id = req.params.id;
    let response = { profile: 'null', info: 'null' };
    try {
        const profile = await companyProfile.findOne({ where: { id } });
        if (profile) {
            let info = await companyInfo.findById(profile.id).exec();
            info = await info.populate({path:'posted_jobs', select:'title job_type location', model: jobModel});
            response = { profile, info };
        }
        return successfulRes(res, 200, response);
    } catch (e) {
        return failedRes(res, 500, e);
    }
};

exports.updateCompanyFull = async (req, res) => {
    const user = req.user;

    const { name, nationality, company_size, verified, phone_number, email, title, logo, CRN_thumbnail, CRN_num, CRN_exp, description, social, cover } =
        req.body;
    let response = { profile: 'null', info: 'null' };
    try {
        if (name || nationality || company_size || verified || phone_number || email || title) {
            let profile = await companyProfile.findOne({ where: { id: user.id } });
            if (!profile) {
                profile = await companyProfile.build({
                    id: user.id
                });
            }

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

        if (description || social || CRN_num || CRN_exp || logo || cover) {
            let info = await companyInfo.findById(user.id).exec();
            if (!info) {
                info = new companyInfo({
                    _id: user.id
                });
            }
            info.description = description ? description : info.description;
            info.social = social ? social : info.social;
            info.logo = logo ? logo : info.logo;
            info.cover = cover ? cover : info.cover;
            info.CRN_thumbnail = CRN_thumbnail ? CRN_thumbnail : info.CRN_thumbnail;
            info.CRN.number = CRN_num ? CRN_num : info.CRN.number;
            info.CRN.exp_date = CRN_exp ? CRN_exp : info.CRN.exp_date;

            await info.save();
            response.info = info;
        }

        return successfulRes(res, 200, response);
    } catch (e) {
        return failedRes(res, 500, e);
    }
};

exports.deleteCompanyFull = async (req, res) => {
    const user = req.user;
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

exports.getPostedJobs = async (req, res)=>{
    try{
        const user = req.user;
        
        const docs = await jobModel.find({company_id: user.id}).select('title job_type location createdAt');
        
        const response = [];
        for(const e of docs){
            const apps = await appModel.find({job_post: e._id, company_id: user.id}).count();

            response.push({...e.toJSON(), applications_count: apps});
        }

        return successfulRes(res, 200, response);
    }catch(e){
        return failedRes(res, 500, e);
    }
};

exports.getApplications = async (req, res) => {
    try {
        const job_id = req.params.job_id;
        const user = req.user;

        const docs = await appModel.find({ job_post: job_id, company_id: user.id }).select('-text_answers -video_answers -updatedAt -cv_url').sort({ applicant_id: 'desc' });
        if (!docs) return failedRes(res, 404, new Error(`Can NOT found applications with job-${job_id}`));

        let job = await jobModel.findById(job_id).select('title job_type location');
        if (!job) return failedRes(res, 404, new Error(`Can NOT found job with ID-${job_id}`));
        
        job = job.toJSON();
        const response = {job_title: job.title, job_type: job.job_type, job_location: job.location, applications:[]};
        for (const e of docs) {
            const baseInfo = await SeekerBaseInfo.findOne({ where: { id: e.applicant_id }, attributes: ['fname', 'lname', 'email'] });
            const details = await SeekerDetails.findById(e.applicant_id).select( '-_id profile_picture');
            
            response.applications.push({ ...e.toJSON(), ...baseInfo.toJSON(), ...details.toJSON() });
        }
        const doco = docs.map(e => e.applicant_id);
        return successfulRes(res, 200, {response, doco});
    } catch (e) {
        return failedRes(res, 500, e);
    }
};
