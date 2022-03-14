import instance from './instance';

const jobApi = {
  get: (params) => instance.get('/jobs', { params }),
  getById: (id) => instance.get(`/jobs/${id}`),
  create: (job) => instance.post('/jobs', job),
  update: (id, job) => instance.put(`/jobs/${id}`, job),
  delete: (id) => instance.delete(`/jobs/${id}`),
};
export default jobApi;
