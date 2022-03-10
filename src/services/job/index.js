const controller = require('./controller');

module.exports = {
    job: controller.jobController,
    application: controller.applicationController
}



/*
const express = require('express');
const job = require('./routes-job');

require('dotenv').config();

const PORT = process.env.DEVPORT || 8080;


const app = express();

app.use(job)


app.get('*', ()=>{
    console.log('server has been hited')
})

app.listen(PORT, ()=>{
    console.log(`connected successfully ON -${PORT}`)
})*/