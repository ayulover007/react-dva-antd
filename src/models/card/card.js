import {query, create} from "../../services/card/card";
import {get} from "../../services/agent/agent";
import {Cookie} from "../../utils";
import {routerRedux} from "dva/router";

export default {
  namespace: 'cardManage',
  state: {
    dayCardAvailable: 0,
    monthCardAvailable: 0,
    quarterCardAvailable: 0,
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
        if (pathname === '/card') {
          dispatch({ type: 'query' })
        }
      })
    }
  },

  effects: {
    *query ({ payload }, { select, call, put }) {
      const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)
      const data = yield call(query, pathQuery);
      const avaliable = yield call(get, {
        'agentId': Cookie.get('agent_id')
      });
      if (data.success && avaliable.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            dayCardAvailable: avaliable.dayCardAvailable,
            monthCardAvailable: avaliable.monthCardAvailable,
            quarterCardAvailable: avaliable.quarterCardAvailable,
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
    *create ({ payload }, { select, call, put }) {
      const data = yield call(create, payload.curItem)
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)
        const { page } = pathQuery
        yield put(routerRedux.push({
          pathname: location.pathname,
          query: !!page ? { ...pathQuery, page: 1 } : pathQuery
        }))
      }
    },
  },

  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    }
  }

}
