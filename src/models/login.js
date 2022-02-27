import * as services from '../services/users';
import { history } from 'umi';

export default {
  namespace: 'loginModel',

  state: {
    accessExpiredAt: '',
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
      // console.log(response);
      if (response.data.code == 200) {
        // yield put({
        //   type: 'save',
        //   payload: response.data,
        // });
        localStorage.setItem('Token', response.data.data.token);
        history.push('/');
      } else {
        onError(response.data.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        accessExpiredAt: action.payload.data.accessExpiredAt,
        token: action.payload.data.token,
      };
    },
  },
};
