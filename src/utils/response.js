const successfulRes = (res, code, data, status = 'success') => {
  return res.status(code).json({
    code: code,
    status: status,
    msg: data,
  });
};

const failedRes = (res, code, error = null, status = 'error') => {
  return res.status(code).json({
    code: code,
    status: status,
    msg: error?.message,
  });
};

module.exports = {
  successfulRes,
  failedRes,
};
