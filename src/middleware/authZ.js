const { failedRes } = require('../utils/response');

exports.isSeeker = (req, res, next) => {
    try {
        if (req.user.role === 'Seeker') {
            next();
        } else {
            throw new Error(`You are NOT authorized to SEEKER ROUTES`);
        }
    } catch (e) {
        if (e instanceof ReferenceError) return failedRes(res, 500, e);
        else return failedRes(res, 401, e);
    }
};

exports.isCompany = (req, res, next) => {
    try {
        if (req.user.role === 'Company') {
            next();
        } else {
            throw new Error(`You are NOT authorized to COMPANY ROUTES`);
        }
    } catch (e) {
        if (e instanceof ReferenceError) return failedRes(res, 500, e);
        else return failedRes(res, 401, e);
    }
};
