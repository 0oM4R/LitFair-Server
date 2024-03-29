//pre-required npm packages
const express = require('express');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const path = require('path');

//controller routes
const UserRoutes = require('./services/User/userRoutes.routes');
const SeekerRoutes = require('./services/seeker/seeker.routes');
const jobRoutes = require('./services/job/routes');
const companyRoutes = require('./services/company/routes');
const utlisRoutes = require('./services/utils/utlis.routes');

//public configuration routes
const SkillsRoutes = require('./services/search/skills/skills.routes');
const JobTitleRoutes = require('./services/search/jobTitle/jobtitle.routes');
const JobCategoriesRoutes = require('./services/search/jobCategory/jobCategories.routes');
const locationRoutes = require('./services/search/location/location.routes');
const jobConfig = require('./services/public_config/job.routes');

//other required
const { testConnection } = require('./DB/SQL.config');
const { workspace, PORT } = require('./config/env');
const { failedRes } = require('./utils/response');
const { deleteFolder } = require('./config/multer');
deleteFolder(path.join('tmp'));

const port = PORT || 8000;
const app = express();


//middilewares
/**
 * Origin[true] puts wildcard * in header
 * which is not suitable for all CORS requests
 */
app.use((req, res, next) => {
    // const allowedOrigins = ['http://localhost:3000'];
    // if (allowedOrigins.includes(origin))
    const origin = req.headers.origin;
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Allow-Credentials', true);
    return next();
});
app.use(cookies());
app.use(express.json());
app.use(morgan('dev'));

testConnection();

//controller routes
app.use(UserRoutes);
app.use(SeekerRoutes);
app.use(jobRoutes);
app.use(companyRoutes);
app.use(utlisRoutes);

//public configuration routes
app.use(SkillsRoutes);
app.use(JobTitleRoutes);
app.use(JobCategoriesRoutes);
app.use(locationRoutes);
app.use(jobConfig);

//error handling
app.get('*', (req, res) => {
    return failedRes(res, 404, new Error(`Not Found: ${req.originalUrl}`));
});

app.listen(port, () => {
    console.log(`Server Listing on PORT-${port}`);
});
