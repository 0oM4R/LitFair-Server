const Seeker_model = require('../seeker/model-seeker').Seeker;

const userProfile=(req,res) => {
    Seeker_model.findOne({where: {id:req.user.id}}).then(res.send(seeker))
}