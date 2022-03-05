import * as services from '@/services/portal';
import { message } from 'antd';

export default {
  namespace: 'portalModel',

  state: {
    roleData: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *getRole({ payload }, { call, put }) {
      const response = yield call(services.getRole);
      if (response.code == 1) {
        yield put({
          type: 'saveRole',
          payload: response.data,
        });
      } else {
        message.error(response.data.meg);
      }
    },
  },

  reducers: {
    saveRole(state, action) {
      return {
        ...state,
        roleData: action.payload,
      };
    },
  },
};
