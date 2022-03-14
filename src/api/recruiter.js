import instance from './instance';

const recruiterApi = {
  get: (params) => instance.get('/companies', { params }),
  getById: (id) => instance.get(`/companies/${id}`),
  create: (recruiter) => instance.post('/companies', recruiter),
  update: (id, recruiter) => instance.put(`/companies/${id}`, recruiter),
  delete: (id) => instance.delete(`/companies/${id}`),
};
export default recruiterApi;
