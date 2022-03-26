const Seeker_model = require('../seeker/model-seeker').Seeker;

const userProfile=async(req, res) => {
    await Seeker_model.findOne({where: {id:req.user.id}}).then((seeker) => {
        res.send(seeker);
    })
}

const updateUserProfile = async(req, res) => {
    const newValue = req.body;
    
    const seeker =await Seeker_model.update(
        {
            date_of_birth:newValue.date_of_birth,
            fname:newValue.fname,
            lname:newValue.lname,
            country:newValue.country,
            nationality:newValue.nationality,
            gender:newValue.gender,
            phone_number:newValue.phone_number,
            title:newValue.title,
        }, 
        {where: {id:req.user.id}})

    const newSeeker = await Seeker_model.findOne({where: {id:req.user.id}}).then((seeker) => {res.send(seeker);});
}

module.exports = {userProfile,updateUserProfile}