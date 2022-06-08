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

const canCreate = (resource) => {
    return async (req, res, next) => {
        try {
            const title = res.locals.user.title;
            const role = res.locals.user.role;
            if (title && title == Admin) return next();

            role.grants.forEach((e) => {
                if (e.resource == resource) {
                    if (e.create) return next();
                    else throw new Error('You are NOT authorized to READ');
                }
            });
        } catch (e) {
            if (e instanceof ReferenceError) return failedRes(res, 500, e);
            else return failedRes(res, 401, e);
        }
    };
};

const canRead = (resource) => {
    return async (req, res, next) => {
        try {
            const title = res.locals.user.title;
            const role = res.locals.user.role;
            if (title && title == Admin) return next();

            role.grants.forEach((e) => {
                if (e.resource == resource) {
                    if (e.read) return next();
                    else throw new Error('You are NOT authorized to READ');
                }
            });
        } catch (e) {
            if (e instanceof ReferenceError) return failedRes(res, 500, e);
            else return failedRes(res, 401, e);
        }
    };
};

const canUpdate = (resource) => {
    return async (req, res, next) => {
        try {
            const title = res.locals.user.title;
            const role = res.locals.user.role;
            if (title && title == Admin) return next();

            role.grants.forEach((e) => {
                if (e.resource == resource) {
                    if (e.update) return next();
                    else throw new Error('You are NOT authorized to READ');
                }
            });
        } catch (e) {
            if (e instanceof ReferenceError) return failedRes(res, 500, e);
            else return failedRes(res, 401, e);
        }
    };
};

const canDelete = (resource) => {
    return async (req, res, next) => {
        try {
            const title = res.locals.user.title;
            const role = res.locals.user.role;
            if (title && title == Admin) return next();

            role.grants.forEach((e) => {
                if (e.resource == resource) {
                    if (e.delete) return next();
                    else throw new Error('You are NOT authorized to READ');
                }
            });
        } catch (e) {
            if (e instanceof ReferenceError) return failedRes(res, 500, e);
            else return failedRes(res, 401, e);
        }
    };
};
