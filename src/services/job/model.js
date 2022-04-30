const mongoose = require('mongoose');
const validator = require('validator');

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

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    username: {
      type: String,
      required: true,
      validate: [!validator.isEmail, 'Invalid Email']
    },
    experience: {
      type: String,
      enum: [Object.values(experienceType), 'Invalid exprience']
    },
    job_type: {
      type: String,
      enum: [Object.values(jobType), 'Invalid Job type name']
    },
    location: {
      type: String
    },
    categories: [
      {
        type: String
      }
    ],
    requirements: [
      {
        type: String
      }
    ],
    skills_tools: [
      {
        type: String
      }
    ],
    description: {
      type: String
    },
    application: {
      title: {
        type: String
      },
      questions: [{ type: String }]
    }
  },
  {
    timestamps: {
      createdAt,
      updatedAt
    },
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

jobSchema.virtual('submissions', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'job_post'
});

const applicationSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    username: {
      type: String,
      required: true,
      validate: [!validator.isEmail, 'Invalid Email']
    },
    job_post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    answers: [{ type: String }]
  },
  {
    timestamps: {
      createdAt,
      updatedAt
    }
  }
);

module.exports = {
  jobType,
  jobModel: mongoose.model('Job', jobSchema),
  appModel: mongoose.model('Application', applicationSchema)
};
