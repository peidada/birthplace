import request from '@/utils/request';

export const getRole = async params => {
  return request(`/api/role`, {
    method: 'GET',
    data: params,
  });
};

export const addRole = async params => {
  return request(`/api/roleAdd`, {
    method: 'POST',
    data: params,
  });
};

export const deleteRole = async params => {
  return request(`/api/roleDelete`, {
    method: 'POST',
    data: params,
  });
};

export const editRole = async params => {
  return request(`/api/roleEdit`, {
    method: 'POST',
    data: params,
  });
};

export const getMenuList = async params => {
  return request(`/api/adminMenuList`, {
    method: 'GET',
    data: params,
  });
};
