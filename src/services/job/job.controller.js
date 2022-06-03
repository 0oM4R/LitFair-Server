const { jobModel } = require('./model');
const { successfulRes, failedRes } = require('../../utils/response');
const {upload_video} = require('../../config/cloudinary');
const amqp = require('amqplib/callback_api');



exports.getJobs = async (req, res) => {
  const user = res.locals.user;
  const q = req.query;
  try {
    const doc = await jobModel.aggregate([
      {
        $match: q
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {title: 1, 
          experience: 1, 
          job_type: 1, 
          location:1 
        }
      }
    ])
    // if (doc && doc.length && doc.length > 0) {
    //   for (let i = 0; i < doc.length; i++) {
    //     if (user == doc[i].user) doc[i] = await doc[i].populate('submissions');
    //   }
    // } else if(doc) {
    //   if (user == doc.user) doc = await doc.populate('submissions');
    // }

    return successfulRes(res, 200, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.getJob = async (req, res) => {
  const _id = req.params.id;
  const user = res.locals.user;
  try {
    let doc = await jobModel.findById(_id).exec();
    if (user.id == doc.company_id) doc = await doc.populate('submissions');
    return successfulRes(res, 200, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.addJob = async (req, res) => {
  const user = res.locals.user;
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
    app_des,
    app_ques
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
      app_title,
      app_des,
      app_ques
    });
    await doc.save();
    return successfulRes(res, 201, doc);
  } catch (err) {
    return failedRes(res, 500, err);
  }
};

exports.updateJob = async (req, res) => {
  const _id = req.params.id;
  const user = res.locals.user;
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
    app_des,
    app_ques
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
    doc.app_title = app_title ? app_title : doc.app_title;
    doc.app_des = app_des ? app_des : doc.app_des;
    doc.app_ques = app_ques ? app_ques : doc.app_ques;

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
  const user = res.locals.user;
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


exports.upload_video = async(req, res)=>{
  
  try{
    const file = req.file;
    console.log('file ', file);
    console.log('req ', req.file);
    // const url = await upload_video(file.path, 'video', 'video_thumb');


    return successfulRes(res, 200, url);
  }catch(err){
    return failedRes(res, 500, err);
  }
}


exports.sendMsg = async (req, res)=>{
  
  try{
    const msg = req.body;
    amqp.connect('amqp://localhost:5672', function(error0, connection) {
      if (error0) {
          throw error0;
      }
      connection.createChannel(function(error1, channel) {
          if (error1) {
              throw error1;
          }
          channel.assertQueue('jobs', {
              durable: false
          });
          
          channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)),
          {
              persistent: true
          });

          console.log(`A job sent successfully -${msg}`);
      });
      setTimeout(function() {
          connection.close();
      }, 500);
  });
  return successfulRes(res, 200, 'A job sent successfully');
  }catch(err){
    return failedRes(res, 500, err);
  }
}