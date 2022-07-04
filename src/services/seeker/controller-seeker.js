const { SeekerDetails, SeekerBaseInfo } = require('../seeker/model-seeker');
const skills = require('../search/skills/model-skills');
const jobTitle = require('../search/jobTitle/model-jobTitle');
const jobCategory = require('../search//jobCategory/model-jobCategories');
const { upload_raw, folderNames } = require('../../config/cloudinary');
const { failedRes, successfulRes } = require('../../utils/response');

/*
const createSeekerProfile = async (req, res) => {
    const { id, email, fname, lname, tokenObject } = req.body;
    try {
        await SeekerBaseInfo.create({
            id: id,
            email: email,
            fname: fname,
            lname: lname
        });

        res.status(200).json({ msg: 'success', TokenObject: tokenObject });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
*/

const userProfile = (req, res) => {
    SeekerBaseInfo.findOne({ where: { id: req.user.id } })
        .then((seeker) => {
            if (!seeker) return failedRes(res, 404, new Error('Seeker Not Found'));
            return res.send(seeker);
        })
        .catch((err) => res.status(500).json({ msg: err.message }));
};

const updateUserProfile = async (req, res) => {
    const {date_of_birth, fname, lname, country, city, nationality, gender, phone_number, title} = req.body;
    try {
        const user  = req.user;
        const seeker = await SeekerBaseInfo.upsert(
            {
                id: user.id, 
                date_of_birth,
                fname,
                lname,
                country,
                city,
                nationality,
                gender,
                phone_number,
                title
            },
            { where: { id: user.id }, returning:true}
        );
        return successfulRes(res, 200, seeker[0]);
    } catch (e) {
        return failedRes(res, 500, e);
    }
};

const updateSeekerDetails = (req, res) => {
    const {
        profile_picture,
        career_lvl,
        jobType,
        jobTitle,
        jobCategory,
        currentState,
        social_links,
        experience_lvl,
        education,
        skills,
        description,
        appliedJobs
    } = req.body;
    const user = req.user;
    SeekerDetails.findByIdAndUpdate(
        user.id,
        {
            _id: user.id,
            profile_picture,
            career_lvl,
            jobType,
            jobTitle,
            jobCategory,
            currentState,
            social_links,
            experience_lvl,
            education,
            skills,
            description,
            appliedJobs
        },
        { upsert: true },
        function(err, doc){
            if(err)return failedRes(res, 500, err);
            return successfulRes(res, 200, doc)
        }
    )
};

const getSeekerDetails = (req, res) => {
    const id = req.params.id;

    SeekerDetails.findById(id)
        .populate({ path: 'skills', model: skills })
        .populate({ path: 'jobTitle', model: jobTitle })
        .populate({ path: 'jobCategory', model: jobCategory })
        .then((seeker) => {
            if (!seeker) return failedRes(res, 404, new Error('Seeker Not Found'));
            return res.send(seeker);
        })
        .catch((err) => {
            if (err.name == 'CastError') {
                res.status(404).json({ msg: 'invalid seeker id' });
            } else {
                res.status(500).json({ msg: err.message });
            }
        });
};

const upload_CV = async (req, res) => {
    if (req.file) {
        let fileName = req.file.originalname;
        let splitArray = fileName.split('.');
        let month = new Date().getMonth() + 1;
        let date = new Date().getFullYear() + '-' + month + '-' + new Date().getDate();
        fileName = splitArray[0] + '$' + date;

        try {
            const id = req.user.id;
            let url = await upload_raw(req.file.path, fileName, folderNames.cvFolder);
            SeekerDetails.findByIdAndUpdate({ _id: id }, { CV: { fileName: fileName, fileUrl: url } }, { upsert: true, new: true }).then(
                (seeker) => {}
            );
            res.send('success');
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    } else {
        res.status(400).json({ msg: 'Field to upload the file' });
    }
};

const delete_CV = async (req, res) => {
    const id = req.user.id;

    try {
        SeekerDetails.findByIdAndUpdate({ _id: id }, { CV: {} }, { upsert: true, new: true }).then((seeker) => {});
        res.send('success');
    } catch (err) {
        res.status(400).json({ msg: err });
    }
};

module.exports = {
    // createSeekerProfile,
    userProfile,
    updateUserProfile,
    updateSeekerDetails,
    getSeekerDetails,
    upload_CV,
    delete_CV
};
