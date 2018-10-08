import {query, resetPwd} from "../../services/user/user";

export default {
  namespace: 'userManage',
  state: {
    list: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: null
    }
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname
        if (pathname === '/user') {
          dispatch({ type: 'query' })
        }
      })
    }
  },

  effects: {
    *query ({ payload }, { select, call, put }) {
      const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)
      const data = yield call(query, pathQuery);
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.rows,
            pagination: {
              current: data.data.page,
              pageSize: Number(data.data.rows.length) < 10 ? 10 : Number(data.data.rows.length),
              total: data.data.records
            }
          }
        })
      }
    },
    *showModal ({ payload }, { select, call, put }) {
      const { type, curItem } = payload
      let newData = {}

      yield put({ type: 'modal/showModal', payload: { type: type } })
      newData.curItem = curItem
      yield put({ type: 'modal/setItem', payload: newData })
    },
    *resetPassword ({ payload }, { select, call, put }) {
      const data = yield call(resetPwd, payload);
      if (data && data.success) {
        yield put({ type: 'query' })
      }
    },
  },

  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    }
  }

}
