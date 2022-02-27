import request from '@/utils/request';

// 测试注册
export async function registerUser(params) {
  // params 来自于effects中参数
  return request(`/api/api/users/registerUser`, {
    // 请求方式
    method: 'POST',
    // 用data包裹参数是官方指定写法，如果data有参数umi-request会默认读取data里面参数。
    data: params,
  });
}

// 测试登录
export const login = async params =>
  request(`/api/api/users/login`, {
    method: 'POST',
    data: params,
  });

// 获取get接口
export async function getUser(params) {
  // params 来自于effects中参数
  return request(`/api/api/users/getUser?id=${params}`, {
    // 请求方式
    method: 'GET',
  });
}
