import * as services from '../services/users';
import { history } from 'umi';

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
    *login({ payload }, { call, put }) {
      // eslint-disable-line
      console.log(111, 'response');

      const response = yield call(services.login, payload);
      console.log('response', response);
      if (response.code == 1) {
        yield put({
          type: 'save',
          payload: response.data.token,
        });
        localStorage.setItem('Token', response.data.token);
        history.push('/');
      } else {
        onError(response.message);
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
