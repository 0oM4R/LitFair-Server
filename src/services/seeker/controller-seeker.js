const path = require('path');
const { SeekerDetails, SeekerBaseInfo } = require('../seeker/model-seeker');
const skills = require('../search/skills/model-skills');
const jobTitle = require('../search/jobTitle/model-jobTitle');
const jobCategory = require('../search//jobCategory/model-jobCategories');
const multer = require('../../config/multer');
const {upload_raw,folderNames} = require('../../config/cloudinary')
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

const userProfile = (req, res) => {
    try {
        SeekerBaseInfo.findOne({ where: { id: req.user.id } }).then((seeker) => {
            res.send(seeker);
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const updateUserProfile = async (req, res) => {
    const newValue = req.body;
    try {
        const seeker = await SeekerBaseInfo.update(
            {
                date_of_birth: newValue?.date_of_birth,
                fname: newValue?.fname,
                lname: newValue?.lname,
                country: newValue?.country,
                city: newValue?.city,
                nationality: newValue?.nationality,
                gender: newValue?.gender,
                phone_number: newValue?.phone_number,
                title: newValue?.title
            },
            { where: { id: req.user.id } }
        );
        res.status(201).send({ msg: 'success' });
    } catch (e) {
        res.status(400).send({ msg: { err: e.name, details: e.message } });
    }
};

const updateSeekerDetails = (req, res) => {
    const id = req.user.id;
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
    try {
        SeekerBaseInfo.findOne({ where: { id: id } })
            .then((seeker) => {
                if (!seeker) {
                    res.status(400).json({ msg: 'Seeker not found' });
                }
            })
            .catch((e) => {
                throw e;
            });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }

    SeekerDetails.findOneAndUpdate(
        { _id: id },
        {
            _id: id,
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
        (err) => {
            if (!err) {
                res.status(201).json({ msg: 'success' });
            } else {
                res.status(500).json({ msg: err });
            }
        }
    );
};
const getSeekerDetails = (req, res) => {
    const id = req.params.id;

    SeekerDetails.findById(id)
        .sort()
        .populate({ path: 'skills', model: skills })
        .populate({ path: 'jobTitle', model: jobTitle })
        .populate({ path: 'jobCategory', model: jobCategory })
        .then((seeker) => {
            res.status(200).json(seeker);
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
        let fileName= req.file.originalname;
        let splitArray = fileName.split(".");
        let date = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
        fileName = splitArray[0]+ "$"+ date;
        
       try{ 
            let url = await upload_raw(req.file.path, fileName,folderNames.cvFolder)
            SeekerDetails.findOneAndUpdate(
                { _id: req.user.id },
                {  CV: {fileName:fileName, fileUrl:url }})
            .then((seeker)=>{console.log(seeker)})
            res.send('success')
        }
        catch(err){
        res.status(500).json({ msg: err.message})
        }
    } else {
        res.status(400).json({ msg: 'Field to upload the file' });
    }
};
const delete_CV = async (req, res) => {
    filePath = path.join('tmp', 'cv', req.user.id + '.pdf');
    try {
        multer.deleteFile(filePath);
        res.send('success');
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

module.exports = {
    createSeekerProfile,
    userProfile,
    updateUserProfile,
    updateSeekerDetails,
    getSeekerDetails,
    upload_CV,
    delete_CV
};
