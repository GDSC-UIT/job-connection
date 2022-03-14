import instance from './instance';

const skillApi = {
  get: (params) => instance.get('/skills', { params }),
  getById: (id) => instance.get(`/skills/${id}`),
  create: (skill) => instance.post('/skills', skill),
  update: (id, skill) => instance.put(`/skills/${id}`, skill),
  delete: (id) => instance.delete(`/skills/${id}`),
};
export default skillApi;
