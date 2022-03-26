const router = require("express").Router();
const auth = require('../../middleware/passport');
const Seeker_model = require('../seeker/model-seeker').Seeker;

router.get("/seeker/profile",auth.Seeker,async(req, res) => {
  await Seeker_model.findOne({where: {id:req.user.id}}).then((seeker) => {
      res.send(seeker);
  })

});

module.exports = {SeekerRoutes:router}