const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const User_model = require('../services/User/model-User').User_model;
const server = require('express').Router();

const loginGoogle = async (req, res, next) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();
        User_model.findOne({ where: { email: email } }).then((user) => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(400).send({ msg: 'User not found' });
            }
        });
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
};

module.exports = loginGoogle;
