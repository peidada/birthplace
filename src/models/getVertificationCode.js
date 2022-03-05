import * as services from '@/services/users';
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
      console.log(111, payload);
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
  reducer: {
    saveCode(state, action) {
      console.log(action);
      return {
        ...state,
        code: action.payload,
      };
    },
  },
};
