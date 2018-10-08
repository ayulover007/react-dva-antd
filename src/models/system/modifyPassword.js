import { routerRedux } from 'dva/router'
import { update } from '../../services/system/modifyPassword'
import { getCurPowers } from '../../utils'

export default {
  namespace: 'systemModifyPassword',
  state: {
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname
      })
    }
  },

  effects: {
    *update ({ payload }, { select, call, put }) {
      yield call(update, payload)
    }
  },

  reducers: {
  }

}
