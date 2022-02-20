import instance from './instance';

const userApi = {
  getUser: (id) => instance.get(`/user/${id}`),
};

export default userApi;
