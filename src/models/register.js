import * as services from '../services/users';
import { history } from 'umi';

export default {
  namespace: 'registerModel',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *registerUser({ payload: todo }, { call, put }) {
      // eslint-disable-line
      const response = yield call(services.registerUser, todo);
      // console.log(response);
      if (response.data.code == 200) {
        // yield put({
        //   type: 'save',
        //   payload: response.data,
        // });
        // history.push('/');
        onSuccess(response.data.data.msg);
      } else {
        onError(response.data.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload.data.data,
      };
    },
  },
};
