

const Seeker_model = require('../seeker/model-seeker').SeekerBaseInfo;
const SeekerDetails = require('../seeker/model-seeker').SeekerDetails;
const skills = require('../search/skills/model-skills').skillsModel;
const jobTitle = require('../search/jobTitle/model-jobTitle').jobTitleModel;
const jobCategory = require('../search//jobCategory/model-jobCategories').jobCategoriesModel;

const createSeekerProfile =async (req, res) => {
    const {id,email,fname,lname} = req.body;
    try{
        await Seeker_model.create(
        {
          id:id,
          email:email,
          fname:fname,
          lname:lname
        })
        res.status(200).json({ msg: "success" })
    }
    catch(err){
        res.status(500).json({ msg: err.message });
    }
}

const userProfile=async(req, res) => {
    await Seeker_model.findOne({where: {id:req.user.id}}).then((seeker) => {
        res.send(seeker);
    })
}

const updateUserProfile = async(req, res) => {
    const newValue = req.body;
   try{ const seeker =await Seeker_model.update(
        {
            date_of_birth:newValue?.date_of_birth,
            fname:newValue?.fname,
            lname:newValue?.lname,
            country:newValue?.country,
            city:newValue?.city,
            nationality:newValue?.nationality,
            gender:newValue?.gender,
            phone_number:newValue?.phone_number,
            title:newValue?.title,
        }, 
        {where: {id:req.user.id}})
        res.status(201).send({msg:"success"})
    }catch(e) {
        res.status(400).send({msg:{
            err: e.name,
            details: e.message
        }})
    }
}

const updateSeekerDetails = async (req, res) => {
    const id = req.user.id;
    await Seeker_model.findOne({where: {id:id}}).then((seeker) => {
        if(!seeker){
            res.status(400).json({msg: 'Seeker not found'})
        } 
    });
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
   
    SeekerDetails.findOneAndUpdate({_id:id},
        {   _id: id,
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
        {upsert:true},
        (err)=>{
            if(!err){
                res.status(201).json({ msg: "success"})
            }else{
                console.log("here")
                res.status(500).json({ msg: err})
            }
        });
}
const getSeekerDetails =async (req, res) => {
    const id = req.user.id;
    await SeekerDetails.findById(id).sort()
    .populate({ path: 'skills', model: skills,select:"-_id" })
    .populate({path: 'jobTitle', model: jobTitle,select:"-_id"})
    .populate({path: 'jobCategory', model: jobCategory,select:"-_id"})
    .then(seeker => {
        res.status(200).json(seeker)
    }).catch(err=>{
        res.status(500).json({ msg: err})
    }) 
}


const upload_CV = async (req, res) => {
    console.log(req.file)
    res.send("success")
}

module.exports = {createSeekerProfile,userProfile,updateUserProfile,updateSeekerDetails,getSeekerDetails,upload_CV}