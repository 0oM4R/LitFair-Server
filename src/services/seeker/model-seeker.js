const { SQL_DB, Sequelize } = require('../../DB/SQL.config');
const mongoose = require('mongoose');
const { User_model } = require('../User/model-User');
let DB_STRING = process.env.DB_STRING.replace(/DBname/g, 'seekerInfo');
const conn = mongoose.createConnection(DB_STRING);

const phoneValidationRegex = /^[+]\d{9,13}/;
const skills = require('../search/skills/model-skills');
const jobTitle = require('../search/jobTitle/model-jobTitle');
const jobCategory = require('../search//jobCategory/model-jobCategories');

const SeekerBaseInfo = SQL_DB.define(
    'Seeker',
    {
        date_of_birth: {
            type: Sequelize.DATE,
            isDate: { msg: 'must be 1960-01-01' },
            isAfter: '1960-01-01',
            isBefore: '2010-01-01',
            allowNull: true
        },
        fname: {
            type: Sequelize.STRING(50),
            isAlpha: { msg: 'must be alpha' }
        },
        lname: {
            type: Sequelize.STRING(50),
            isAlpha: { msg: 'must be alpha' },
            allowNull: true
        },
        nationality: {
            type: Sequelize.STRING(50),
            isAlpha: { msg: 'must be alpha' },
            allowNull: true
        },
        country: {
            type: Sequelize.STRING(50),
            isAlpha: { msg: 'must be alpha' },
            allowNull: true
        },
        city: {
            type: Sequelize.STRING(50),
            isAlpha: { msg: 'must be alpha' },
            allowNull: true
        },
        gender: {
            type: Sequelize.STRING(6),
            isAlpha: { msg: 'must be alpha' },
            allowNull: true
        },
        phone_number: {
            type: Sequelize.INTEGER(15),
            // validate:{
            //   validator : (v)=>{
            //     return phoneValidationRegex.test(v)
            //   },
            //   msg: "must be a valid phone number"
            // },

            allowNull: true
        },
        title: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    },
    {
        timestamps: false
    }
);

SeekerBaseInfo.belongsTo(User_model, {
    foreignKey: 'id',
    primaryKey: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
SeekerBaseInfo.belongsTo(User_model, {
    foreignKey: 'email',
    targetKey: 'email',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

SeekerBaseInfo.sync();

//mongoose schema
const schema = mongoose.Schema(
    {
        //career interests
        _id: {
            type: Number,
            required: [true, '_id field MUST be added manually']
        },
        profile_picture: { type: String },
        career_lvl: { type: String },
        jobType: [{ type: String }],
        jobTitle: [{ type: mongoose.Types.ObjectId, ref: jobTitle }],
        jobCategory: [{ type: mongoose.Types.ObjectId, ref: jobCategory }],
        currentState: { type: String },
        social_links: {
            github: { type: String },
            linkedin: { type: String },
            website: { type: String }
        },
        // professional info
        experience_lvl: { type: String },
        education: {
            degree: { type: String },
            fields: [{ type: String }],
            university: { type: String },
            date: { type: Date },
            grade: { type: String }
        },
        skills: [
            {
                type: mongoose.Types.ObjectId,
                ref: skills
            }
        ],
        CV: { type: String },
        description: { type: String },
        appliedJobs: [{ type: String }]
    },
    { versionKey: false }
);

const SeekerDetails = conn.model('seeker', schema);

module.exports = { SeekerBaseInfo, SeekerDetails };
