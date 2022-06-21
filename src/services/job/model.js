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
      text_questions: { type: [String] },
      video_questions: { type: [String] }
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
    cv_url: {type: String},
    text_answers: [{
      question: {type: String},
      answer: {type: String}
    }],
    video_answers: [{
      question: { type: String },
      video_url: { type: String },
      report:{type: mongoose.Schema.Types.Mixed}
    }],

  },
  {
    timestamps: true
  }
);

const { jobModel, appModel } = (() => {
    const conn = mongoose.createConnection(job_DB);
    conn.on('connected', () => {
        console.log(`JOB_Mongodb has been Connected`);
    });

    conn.on('disconnected', () => {
        console.log(`JOB_Mongodb has been Dissconnected`);
    });
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
