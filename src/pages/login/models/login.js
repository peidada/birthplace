import * as services from '@/services/login';
import { history } from 'umi';
import { message } from 'antd';

export default {
  namespace: 'loginModel',

  state: {
    token: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *loginP({ payload }, { call, put }) {
      const response = yield call(services.loginP, payload);
      if (response.code === 1) {
        yield put({
          type: 'save',
          payload: response.data.token,
        });
        localStorage.setItem('Token', response.data.token);
        history.push('/');
      } else {
        message.error(response.message);
      }
    },
    *login({ payload }, { call, put }) {
      const response = yield call(services.login, payload);
      if (response.code === 1) {
        yield put({
          type: 'save',
          payload: response.data.token,
        });
        localStorage.setItem('Token', response.data.token);
        history.push('/');
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
};
