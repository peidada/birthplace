import * as services from '../services/users';
import { history } from 'umi';

export default {
  namespace: 'usersModel',

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
    *loginFunc({ payload: todo }, { call, put }) {
      // eslint-disable-line
      const response = yield call(services.login, todo);
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
    *getUser({ payload: id }, { call, put }) {
      const response = yield call(services.getUser, id);
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
