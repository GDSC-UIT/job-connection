const { default: instance } = require('./instance');

const experienceApi = {
  get: (params) => instance.get('/experiences', { params }),
  getById: (id) => instance.get(`/experiences/${id}`),
  create: (job) => instance.post('/experiences', job),
  update: (id, experience) => instance.put(`/experiences/${id}`, experience),
  delete: (id) => instance.delete(`/experiences/${id}`),
};

export default experienceApi;
