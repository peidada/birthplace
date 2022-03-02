import request from '@/utils/request';

// 测试注册
export async function registerUser(params) {
  // params 来自于effects中参数
  return request(`/api/registry`, {
    // 请求方式
    method: 'POST',
    // 用data包裹参数是官方指定写法，如果data有参数umi-request会默认读取data里面参数。
    data: params,
  });
}

// 测试登录 (验证码)
export const login = async params => {
  return request(`/api/login`, {
    method: 'POST',
    data: params,
  });
};

// 测试登录 (密码)
export const loginP = async params => {
  return request(`/api/loginP`, {
    method: 'POST',
    data: params,
  });
};

// 获取get接口
export async function getCode(params) {
  // params 来自于effects中参数
  return request(`/api/verCode`, {
    method: 'POST',
    data: params,
  });
}
