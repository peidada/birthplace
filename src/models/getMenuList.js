import * as services from '@/services/portal';
import { message } from 'antd';

export default {
  namespace: 'menuListModel',

  state: {
    menuList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *getMenuList({ payload }, { call, put }) {
      const response = yield call(services.getMenuList);
      if (response.code == 1) {
        yield put({
          type: 'saveMenuList',
          payload: response.data,
        });
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    saveMenuList(state, action) {
      return {
        ...state,
        menuList: action.payload,
      };
    },
  },
};
