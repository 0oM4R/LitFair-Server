const { companyProfile, companyInfo } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');
const { appModel } = require('../job/model');
const {SeekerBaseInfo, SeekerDetails} = require('../seeker/model-seeker');

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
            info = await info.populate('posted_jobs', 'title job_type location');
            response = { profile, info };
        }
        return successfulRes(res, 200, response);
    } catch (e) {
        return failedRes(res, 500, e);
    }
};

exports.updateCompanyFull = async (req, res) => {
    const user = req.user;

    const { name, nationality, company_size, verified, phone_number, email, title, logo, CRN_thumbnail, CRN_num, CRN_exp, description, social } =
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

        if (description || social || CRN_num || CRN_exp) {
            let info = await companyInfo.findById(user.id).exec();
            if (!info) {
                info = new companyInfo({
                    _id: user.id
                });
            }
            info.description = description ? description : info.description;
            info.social = social ? social : info.social;
            info.logo = logo ? logo : info.logo;
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

exports.getApplications = async (req, res)=>{
    try{
        const job_id = req.params.id;
        const user = req.user;
        
        let response = await appModel.find({job_post: job_id, company_id: user.id}).sort({total_score: 1});

        response = response.forEach( async e=>{
            e.applicant_BaseInfo = await SeekerBaseInfo.findOne({where: {id: e.applicant_id}});
            e.profile_picture = await SeekerDetails.findById(e.applicant_id).select('profile_picture');

        })

        return successfulRes(res, 200, response);
    }catch(e){
        return failedRes(res, 500, e);
    }
};