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
      _id: false,
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
    company_id: { type: Number, required: [true, '_id field MUST be added manually'], ref: 'CompanyInfo' },
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
    progress: {
      _id: false,
      app_submitted: {type: Boolean, default: false},
      cv_scanned: {type: Boolean, default: false},
      live_inter: {type: Boolean, default: false},
      feedback_1: {type: Boolean, default: false},
      hr_inter: {type: Boolean, default: false},
      feedback_2: {type: Boolean, default: false},
    },
    feedback_1: {
      _id: false,
      Excited: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      Engaged: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      Smiled: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      RecommendHiring: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      NoFillers: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      StructuredAnswers: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      Friendly: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      Focused: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      NotAwkward: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      Paused: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      EyeContact: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      Authentic: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      Calm: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      SpeakingRate: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
      NotStressed: {type: Number,set: (v) => Math.round(v * 100) / 100, default: 0.0},
    },
    feedback_2: {
      _id: false,
      text: {type: String}
    }
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
