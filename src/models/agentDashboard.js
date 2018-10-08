import {parse} from 'qs'
import {getSize, getCurrentMember, getUserStatus, getMemberStatus, getAgentStatus, getCardStatus, getSalaryStatus} from '../services/agentDashboard'
import {routerRedux} from "dva/router";
import Cookie from "../utils/cookie";

export default {
  namespace: 'agentDashboard',
  state: {
    userSize: 0,
    total: 0,
    agentSize: 0,
    memberCount: [0, 0, 0],
    userAdded: [0, 0, 0],
    memberStatus:{
      '1': [0, 0, 0],
      '2': [0, 0, 0],
      '3': [0, 0, 0],
    },
    agentStatus: [0, 0, 0],
    cardTotalStatus: [0, 0, 0],
    cardUsedStatus: [0, 0, 0],
    memberAddSelect: '1',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname
        if (pathname === '/' || pathname === '/agentDashboard') {
          const agentType = Cookie.get('agent_type');
          if (agentType === '1') {
            dispatch({type: 'query'})
          } else {
            dispatch(routerRedux.push({pathname: '/no-power'}))
          }
        }
      })
    }
  },
  effects: {
    *query ({
      payload
    }, {call, put}) {
      const agentId = Cookie.get('agent_id');
      const [total, memberCount, userAdded, memberAdded, agentAdded, userStatus] = yield [
        call(getSize, agentId),
        call(getCurrentMember, agentId),
        call(getUserStatus, agentId),
        call(getMemberStatus, agentId),
        call(getAgentStatus, agentId),
        call(getCardStatus, agentId),
      ];
      yield put({
        type: 'querySuccess',
        payload: {
          ...total.data,
          memberCount: [memberCount.data.month, memberCount.data.day, memberCoun.data.quarter],
          userAdded: [userAdded.data.day, userAdded.data.week, userAdded.data.month],
          memberStatus: {
            '1': [memberAdded.data.day.dayCard, memberAdded.data.day.monthCard, memberAdded.data.day.quarterCard],
            '2': [memberAdded.data.week.dayCard, memberAdded.data.week.monthCard, memberAdded.data.week.quarterCard],
            '3': [memberAdded.data.month.dayCard, memberAdded.data.month.monthCard, memberAdded.data.month.quarterCard],
          },
          agentStatus: [agentAdded.data.day, agentAdded.data.week, agentAdded.data.month],
          cardTotalStatus: [userStatus.data.month.total, userStatus.data.day.total, userStatus.data.quarter.total],
          cardUsedStatus: [userStatus.data.month.used, userStatus.data.day.used, userStatus.data.quarter.used],
        }
      });
      console.log(total, memberCount, userAdded, memberAdded, agentAdded, userStatus);
    },
    *memberAddSelectChange({payload}, {put}) {
      yield put({
        type: 'querySuccess',
        payload: {
          memberAddSelect: payload,
        }
      })
    }
  },
  reducers: {
    querySuccess (state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    queryWeather (state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
}
