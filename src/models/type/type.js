import {query, create, getRootTypes, get, update, deleteType} from "../../services/type/type";
import {routerRedux} from "dva/router";
import {message} from "antd/lib/index";

export default {
  namespace: 'typeManage',
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
        if (pathname === '/type') {
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
      const { type, curItem } = payload;
      let newData = {};
      const rootType = yield call(getRootTypes);
      if(rootType.success) {
        yield put({ type: 'modal/showModal', payload: { type: type, rootType: rootType.data } })
        if(type === 'update') {
          const data = yield call(get, { typeId: curItem.typeId });
          if(data && data.success) {
            newData.curItem = data.data
            yield put({ type: 'modal/setItem', payload: newData })
          }
        } else {
          newData.curItem ={}
          yield put({ type: 'modal/setItem', payload: newData })
        }
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
    *deleteType({payload}, {call, put}) {
      const data = yield call(deleteType, payload);
      if(data && data.success) {
        message.success('删除成功');
        yield put({ type: 'query' });
      }
    },
    *update ({ payload }, { select, call, put }) {
      const data = yield call(update, payload.curItem);
      if (data && data.success) {
        yield put({ type: 'modal/hideModal' })
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
