const Seeker_model = require('../seeker/model-seeker').SeekerBaseInfo;
const SeekerDetails = require('../seeker/model-seeker').SeekerDetails;

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
        res.status(200).send("success");
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
        res.status(400).send({msg:e.message})
    }
   
}

const createSeekerDetails = async (req, res) => {
    const id = req.params._id;
    await Seeker_model.findOne({where: {id:id}}).then((seeker) => {
        
        if(!seeker){
            res.status(400).json({msg: 'Seeker not found'})
        } 
    });
    const {
        profile_picture,
        career_lvl,
        jopType,
        jobTitle,
        jobCategory,
        currentState,
        social_links,
    } = req.body;

    SeekerDetails.findOneAndUpdate(id,
        {   _id: id,
            profile_picture,
            career_lvl,
            jopType,
            jobTitle,
            jobCategory,
            currentState,
            social_links,
        },
        {upsert:true},
        (err)=>{
            if(!err){
                res.status(201).json({ msg: "success"})
            }else{
                res.status(500).json({ msg: "failed to update profile"})
            }
        });
}
module.exports = {createSeekerProfile,userProfile,updateUserProfile,createSeekerDetails}