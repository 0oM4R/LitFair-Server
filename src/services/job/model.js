const mongoose = require('mongoose');
const validator = require('validator');
const { job_DB } = require('../../config/env');

const jobType = {
    fullTime: 'Full Time',
    partTime: 'Part Time',
    freeProj: 'Freelance/Project',
    internship: 'internship',
    formHome: 'Work From Home'
};

const experienceType = {
    freshGrad: 'Fresh Graduate',
    lessYear: 'Less Than 1 Year',
    year13: '1-3 Years',
    more3Year: 'More Than +3 Years'
};

//prettier-ignore
const jobSchema = new mongoose.Schema(
  {
    company_id: { type: Number, required: [true, '_id field MUST be added manually'], ref: 'CompanyInfo' },
    title: { type: String },
    experience: { type: String, enum: [...Object.values(experienceType), 'Invalid exprience'] },
    job_type: { type: String, enum: [...Object.values(jobType), 'Invalid Job type name'] },
    location: { type: String },
    categories: { type: [String] },
    requirements: { type: [String] },
    skills_tools: {type: [String]},
    description: {type: String},
    application: {
      title: { type: String },
      description: { type: String },
      questions: { type: [String] }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

jobSchema.virtual('submissions', {
    ref: 'Application',
    localField: '_id',
    foreignField: 'job_post'
});

//prettier-ignore
const applicationSchema = new mongoose.Schema(
  {
    applicant_id: { type: Number, required: true},
    job_post: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    answers: { type: Map, of: String }
  },
  {
    timestamps: true
  }
);

const { jobModel, appModel } = (() => {
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
        99: 'uninitialized'
    };
    const conn = mongoose.createConnection(job_DB);
    console.log(`JOB_Mongodb has been ${states[conn.readyState]}`);

    const jobModel = conn.model('Job', jobSchema);
    const appModel = conn.model('Application', applicationSchema);
    return { jobModel, appModel };
})();

module.exports = {
    jobType,
    experienceType,
    jobModel,
    appModel
};
