import * as services from '@/services/users';
import { history } from 'umi';
import { message } from 'antd';

export default {
  namespace: 'registerModel',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *registerUser({ payload }, { call, put }) {
      console.log(payload, 'payload');
      const response = yield call(services.registerUser, payload);
      if (response.code == 1) {
        history.push('/login');
        message.success('注册成功');
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {},
};
