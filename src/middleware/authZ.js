const { Admin, Vice, Manager, Assistant } = require('../config/titles');
const { failedRes } = require('../utils/response');

exports.isAdmin = (req, res, next) => {
  try {
    const title = res.locals.user.title;
    if (title && title == Admin) return next();
    else throw new Error('You are NOT authorized to Admins Only Routes');
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 500, e);
    else return failedRes(res, 401, e);
  }
};

exports.isVice = (req, res, next) => {
  try {
    const title = res.locals.user.title;
    if (title && title == Vice) return next();
    else throw new Error('You are NOT authorized to Vices Routes');
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 500, e);
    else return failedRes(res, 401, e);
  }
};

exports.isManager = (req, res, next) => {
  try {
    const title = res.locals.user.title;
    if (title && title == Manager) return next();
    else throw new Error('You are NOT authorized to Managers Routes');
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 500, e);
    else return failedRes(res, 401, e);
  }
};

exports.isAssistant = (req, res, next) => {
  try {
    const title = res.locals.user.title;
    if (title && title == Assistant) return next();
    else throw new Error('You are NOT authorized to Assistant Routes');
  } catch (e) {
    if (e instanceof ReferenceError) return failedRes(res, 500, e);
    else return failedRes(res, 401, e);
  }
};

exports.canCreate = (resource) => {
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

exports.canRead = (resource) => {
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

exports.canUpdate = (resource) => {
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

exports.canDelete = (resource) => {
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