import * as services from '@/services/login';
import { history } from 'umi';
import { message } from 'antd';

export default {
  namespace: 'registerModel',

  state: {
    code: '', //验证码
  },

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
    *getCode({ payload }, { call, put }) {
      const response = yield call(services.getCode, payload);
      if (response.code == 1) {
        yield put({
          type: 'saveCode',
          payload: response.data,
        });
        message.success('获取验证码成功');
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    saveCode(state, action) {
      console.log(action);
      return {
        ...state,
        code: action.payload,
      };
    },
  },
};
