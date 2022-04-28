<<<<<<< HEAD
const mongoose = require('mongoose');
const jobModel = require('./model-job').jobModel;
const applicationModel = require('./model-job').appModel;

class jobController {
  constructor(dbURI) {
    this.dbURI = dbURI;
    mongoose
      .connect(dbURI)
      .then(() => console.log('Job database connected successfully'))
      .catch((e) => {
        console.log(e);
      });
  }

  async addJob(post) {
    let data = post;
    const toDate = new Date(data.date_posted + 'UTC');
    data.date_posted = toDate == 'Invalid Date' ? new Date() : toDate;

    const newJob = new jobModel(data);
=======
const {jobModel, appModel} = require('./model');


 class jobController {
  
  // constructor(dbURI) {
  //   this.dbURI = dbURI;
  //   mongoose
  //     .connect(dbURI)
  //     .then(() => console.log('Job database connected successfully'))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }
  
  async getJobs() {    
    try {
      const doc = await jobModel.find({}).exec();
      return doc;
    } catch (err) {
      throw new Error(`Can't get jobs::ERROR:${err}`);
    }
  }
  
  async getJob(id) {  
    try {
      const doc = await jobModel.findById(id).exec();
      return doc;
    } catch (err) {
        throw new Error(`Can't get job::ERROR:${err}`);
    }
  }
>>>>>>> job

  async addJob(schema) {
    try {
<<<<<<< HEAD
      const response = await newJob.save();
      return response;
    } catch (e) {
      throw new Error(`Can't Add new job e:${e}`);
=======
      const saved = new jobModel(schema);
      
      const doc =  await saved.save();
      return doc;
    } catch (err) {
        throw new Error(`Can't Add new job::ERROR:${err}`);
>>>>>>> job
    }
  }
  

<<<<<<< HEAD
  async getJobs() {
=======
  async editJob(id, schema) {
>>>>>>> job
    try {
      const doc = await jobModel.findByIdAndUpdate(id, schema, {  new: true });
      return doc;
    } catch (err) {
        throw new Error(`Can't edit job::ERROR:${err}`);
    }
  }

<<<<<<< HEAD
  async getJob(id) {
    try {
      const response = await jobModel.findById(id).exec();
      return response;
    } catch (e) {
      throw new Error(`Can't get job with ID:${id}-e:${e}`);
    }
  }

  async editJob(id) {
    try {
      const response = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      return response;
    } catch (e) {
      throw new Error(`Can't edit job with ID:${id}-e:${e}`);
    }
  }

  async deletJob(id) {
    try {
      const response = await jobModel.findByIdAndDelete({ _id: job_id });
      return response;
    } catch (e) {
      throw new Error(`Can't delete job with ID:${id}-e:${e}`);
    }
  }
}

class applicationController {}
=======
  async deleteJob(id){
    try{
        const doc = await jobModel.findByIdAndDelete(id);
        return doc;
    }catch(err){
        throw new Error(`Can't delete job::ERROR:${err}`);
    }
  }

}


class applicationController{

  async getApps() {
    try {
      const doc = await appModel.find({}).exec();
      return doc;
    } catch (err) {
      throw new Error(`Can't get application::ERROR:${err}`);
    }
  }
  
  async getApp(id) {  
    try {
      const doc = await appModel.findById(id).exec();
      return doc;
    } catch (err) {
        throw new Error(`Can't get application::ERROR:${err}`);
    }
  }

  async addApp(schema) {
    try {
      const saved = new appModel(schema);
      
      const doc =  await saved.save();
      return doc;
    } catch (err) {
        throw new Error(`Can't Add new application::ERROR:${err}`);
    }
  }
  

  async editApp(id, schema) {
    try {
      const doc = await appModel.findByIdAndUpdate(id, schema, {  new: true });
      
      if (schema.questions) {
        for (const [objK, objV] of Object.entries(doc.questions)) {
          schema.questions.forEach((mapV, mapK) => {
            if (objK == mapK) doc.questions.set(mapK, mapV);
          });
        }
      }
      return doc;
    } catch (err) {
        throw new Error(`Can't edit application::ERROR:${err}`);
    }
  }

  async deleteApp(id){
    try{
        const doc = await jobModel.findByIdAndDelete(id);
        return doc;
    }catch(err){
        throw new Error(`Can't delete application::ERROR:${err}`);
    }
  }
}
>>>>>>> job

module.exports = {
  jobController,
  applicationController,
};
