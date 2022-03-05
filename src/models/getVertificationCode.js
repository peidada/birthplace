import * as services from '@/services/login';
import { message } from 'antd';

export default {
  namespace: 'getVertificationCode',
  state: {
    code: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },
  effects: {
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
