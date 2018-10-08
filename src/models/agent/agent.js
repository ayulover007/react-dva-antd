import {create, query, get, update, deleteAgent, allot, sale} from "../../services/agent/agent";
import { Cookie } from '../../utils'
import { message } from 'antd'
import {routerRedux} from "dva/router";

export default {
  namespace: 'agentManage',
  state: {
    agentId: '',
    dayCardAvailable: 0,
    monthCardAvailable: 0,
    quarterCardAvailable: 0,
    allotFormVisible: false,
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
        if (pathname === '/agent') {
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
    *update ({ payload }, { select, call, put }) {
      const data = yield call(update, payload.curItem);
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
        yield put({ type: 'query' })
      }
    },
    *deleteAgent({payload}, {call, put}) {
      const data = yield call(deleteAgent, payload);
      if(data && data.success) {
        message.success('删除成功');
        yield put({ type: 'query' });
      }
    },
    *showModal ({ payload }, { select, call, put }) {
      const { type, curItem } = payload
      let newData = {}

      yield put({ type: 'modal/showModal', payload: { type: type } })

      const data = yield call(get, { agentId: curItem.agentId })
      console.log(data);
      if(data && data.success) {
        newData.curItem = data.data
      }

      yield put({ type: 'modal/setItem', payload: newData })
    },
    *showAllotModal({payload}, {put}) {
      yield put({
        type: 'allotFormVisible',
        payload: {
          allotFormVisible: true,
          agentId: payload
        }
      })
    },
    *hideAllotModal({payload}, {put}) {
      yield put({
        type: 'allotFormVisible',
        payload: {
          allotFormVisible: false,
        }
      })
    },
    *allotUpdate({payload}, {call, put}) {
      const callType = Cookie.get('agent_type') === '0' ? sale : allot
      const data = yield call(callType, payload.curItem);
      if (data && data.success) {
        yield put({
          type: 'allotFormVisible',
          payload: {
            allotFormVisible: false,
          }
        });
        yield put({ type: 'query' });
      }
    }
  },

  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
    allotFormVisible (state, action) {
      return { ...state, ...action.payload }
    }
  }

}
