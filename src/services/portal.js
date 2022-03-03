import request from '@/utils/request';

export const getRole = async params => {
  return request(`/api/role`, {
    method: 'POST',
    data: params,
  });
};

export const addRole = async params => {
  return request(`/api/roleAdd`, {
    method: 'POST',
    data: params,
  });
};
