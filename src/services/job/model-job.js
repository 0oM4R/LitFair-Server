const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  owner_id: {
    type: Number,
  },
  date_posted: {
    type: Date,
    default: Date.now(),
  },
  job_type: {
    type: String,
  },
  location: {
    type: String,
  },
  categories: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  requirements: [
    {
      type: String,
    },
  ],
  skills_tools: [
    {
      type: String,
    },
  ],
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    },
  ],
});

const applicationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  date_submitted: {
    type: Date,
  },
  questions: {
    type: Map,
  },
});

module.exports = {
  jobModel: mongoose.model('Job', jobSchema),
  appModel: mongoose.model('Application', applicationSchema),
};
