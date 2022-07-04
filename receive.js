const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
require('dotenv').config();

const env = {
    // rabbitMQ
    MQ_URL: process.env.MQ_URL,
    PUBLISH_VIDEOMQ_NAME: process.env.PUBLISH_VIDEOMQ_NAME,
    CONSUME_VIDEOMQ_NAME: process.env.CONSUME_VIDEOMQ_NAME,
};
const appModel  = (() => {
    const conn = mongoose.createConnection(process.env.job_DB);
    conn.on('connected', () => {
        console.log(`JOB_Mongodb has been Connected`);
    });

    conn.on('disconnected', () => {
        console.log(`JOB_Mongodb has been Dissconnected`);
    });

    const appModel = conn.models;
    console.log(appModel)
    conn.on('connected', ()=>{
        console.log(conn);
    });
    return appModel
})();
// appModel;

async function receive() {
    try {

        amqp.connect(env.MQ_URL, function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                channel.assertQueue(env.CONSUME_VIDEOMQ_NAME, {
                    durable: false
                });


                console.log("[x] Jobs queue Waiting for messages. To exit press CTRL+C");

                channel.consume(env.CONSUME_VIDEOMQ_NAME, function(msg) {

                    channel.ack(msg);
                }, 
                {
                    noAck: false
                });


            });
        });
    } catch (e) {
        console.log(e)
    }
}


receive();