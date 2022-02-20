import instance from './instance';

const profileApi = {
  get: () => instance.get('/profile'),
  update: async (data) => instance.put('/profile', data),
};

export default profileApi;
