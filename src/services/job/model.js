const mongoose = require('mongoose');

const jobType = {
  fullTime: 'Full Time',
  partTime: 'Part Time',
  freeProj: 'Freelance/Project',
  internship: 'internship',
  formHome: 'Work From Home'
}

const jobSchema = new mongoose.Schema({
  title: {type: String},
  owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
  date_posted: {type: Date, default: Date.now(),},
  job_type: {type: String, enum: [Object.values(jobType), 'Invalid Job type name']},
  location: {type: String},
  categories: [{type: String}],
  requirements: [{type: String}],
  skills_tools: [{type: String}],
  applications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Application'}],
  description: {type: String},
},{
  timestamps:{
    createdAt,
    updatedAt
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

jobSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'job_post'
});

const applicationSchema = new mongoose.Schema({
  title: {type: String},
  owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Seeker'},
  job_post: {type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
  questions: {type: Map, of: String}
},{
  timestamps: {
    createdAt,
    updatedAt
  }
});

module.exports = {
  jobType,
  jobModel: mongoose.model('Job', jobSchema),
  appModel: mongoose.model('Application', applicationSchema),
};
