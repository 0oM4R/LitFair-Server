const express = require('express');
const job = require('./controller-job');
require('dotenv').config();



const route = express.Router();
const newJob = new job(process.env.MONGODB_URI);




route.use(express.json());

route.get('/', (req, res)=> res.send('hi ser'))
route.get('/jobs', newJob.getJobs);
route.get('/job/:id', newJob.getJob);
route.post('/jobs', newJob.addJob);
route.delete('/jobs/:id', newJob.deletJob);


module.exports = route;