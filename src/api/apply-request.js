const { default: instance } = require('./instance');

const applyRequestApi = {
  create: (data) => instance.post('/applyrequests', data),
  get: (params) => instance.get('/applyrequests/', { params }),
};

export default applyRequestApi;
