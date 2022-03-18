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

    try {
      const response = await newJob.save();
      return response;
    } catch (e) {
      throw new Error(`Can't Add new job e:${e}`);
    }
  }

  async getJobs() {
    try {
      const response = await jobModel.find({}).exec();
      return response;
    } catch (e) {
      throw new Error(`Can't get jobs e:${e}`);
    }
  }

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

module.exports = {
  jobController,
  applicationController,
};
