import { routerRedux } from 'dva/router'
import { isLogin, userName, setLoginIn, setLoginOut, menu, invitationCode } from '../utils'
import { getToken, login, userInfo, logout } from '../services/app'
import Cookie from '../utils/cookie'
import MD5 from 'js-md5';

const initPower = Cookie.getJSON('user_power')

function getAllPathPowers(menuArray, curPowers) {
  return menuArray.reduce((dir, item) => {
    dir[`/${item.key}`] = curPowers[item.id]
    if(item.children) {
      item.children.reduce((cdir, cur) => {
        dir[`/${cdir}/${cur.key}`] = curPowers[cur.id]
        return cdir
      },item.key)
      getAllPathPowers(item.children, curPowers)
    }
    return dir
  }, {})
}

export default {
  namespace : 'app',
  state : {
    login: !!isLogin(),
    user: {
      name: userName || '',
      invitationCode: invitationCode || '',
    },
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'), //侧边栏菜单打开的keys,
    userPower: initPower,
    curPowers: []
  },
  subscriptions : {
    setup({ dispatch, history }) {
      window.onresize = function() {
        dispatch({type: 'changeNavbar'})
      }

      if(!isLogin()) {
        dispatch(routerRedux.push({
          pathname: '/login',
          state: { nextPathname: location.pathname !== '/login' ? location.pathname : '/', nextSearch: location.search }
        }))
      }
    }
  },
  effects : {
    *login({
        payload
      }, {call, put, select}) {
        // if(dataToken.success) {
        //   const params = { access_token: dataToken.access_token, mobile: payload.username, username: payload.username, password: payload.password }
        //   const data = yield call(login, params)
        //
        //   if (data && data.success) {
        //     const allPathPowers = yield getAllPathPowers(menu, data.role_power)
        //
        //     yield setLoginIn(payload.username, dataToken.access_token, data.role_power, allPathPowers)
        //     yield put({
        //       type: 'loginSuccess',
        //       payload: {
        //         user: {
        //           name: payload.username
        //         },
        //         userPower: data.role_power
        //       }
        //     })
        //
        //     const nextLocation = yield select(state => state.routing.locationBeforeTransitions)
        //     const nextPathname = nextLocation.state && nextLocation.state.nextPathname && nextLocation.state.nextPathname !== '/no-power' ? nextLocation.state.nextPathname : '/dashboard'
        //     yield put(routerRedux.push({
        //       pathname: nextPathname,
        //       search: nextLocation.state && nextLocation.state.nextSearch
        //     }))
        //   }
        // }
        const params = {username: payload.username, password: MD5(payload.password) };
        const data = yield call(login, params);
        console.log(data);
        if(data.success) {
          yield setLoginIn(payload.username, data.data.agentId, data.data.agentType, data.data.invitationCode);
          yield put({
            type: 'loginSuccess',
            payload: {
              user: {
                name: payload.username,
                invitationCode: Cookie.get('invitation_code')
              },
              userPower: [1, 2, 3, 4, 5]
            }
          })
          const agentUrl = Cookie.get('agent_type') === '0' ? '/dashboard' : '/agentDashboard';
          const nextLocation = yield select(state => state.routing.locationBeforeTransitions)
          const nextPathname = nextLocation.state && nextLocation.state.nextPathname && nextLocation.state.nextPathname !== '/no-power' ? nextLocation.state.nextPathname : agentUrl
          yield put(routerRedux.push({
            pathname: nextPathname,
            search: nextLocation.state && nextLocation.state.nextSearch
          }))
          location.reload();
        }
    },
    *logout({
        payload
      }, {call, put}) {
        const data = { success: true } //yield call(logout, parse(payload))
        if (data && data.success) {
          yield setLoginOut()
          yield put({type: 'logoutSuccess'})
          yield put(routerRedux.push({
            pathname: '/login',
          }))
        }
    }
  },
  reducers : {
    loginSuccess(state, action) {
      return { ...state, ...action.payload, login: true }
    },
    logoutSuccess(state) {
      return { ...state, login: false, userPower: {}, curPowers: [] }
    },
    switchSider(state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return { ...state, siderFold: !state.siderFold }
    },
    changeTheme(state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return { ...state, darkTheme: !state.darkTheme }
    },
    changeNavbar(state) {
      return { ...state, isNavbar: document.body.clientWidth < 769 }
    },
    switchMenuPopver(state) {
      return { ...state, menuPopoverVisible: !state.menuPopoverVisible }
    },
    handleNavOpenKeys(state, action) {
      return { ...state, ...action.payload }
    },
    changeCurPowers(state, action) {
      return { ...state, ...action.payload }
    }
  }
}
