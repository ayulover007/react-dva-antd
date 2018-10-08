import React from 'react'
import {Router, Route, IndexRoute} from 'dva/router'
import App from './routes/App'
import {isLogin} from './utils'

function redirectToLogin(nextState, replace) {
  if (!isLogin()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
        nextSearch: location.search
      }
    })
  }
}

function redirectToDashboard(nextState, replace) {
  if (isLogin()) {
    replace('/dashboard')
  }
}

const cached = {};

function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

export default function ({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      onEnter: redirectToLogin,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, {component: require('./routes/Dashboard')})
        }, 'dashboard')
      },
      childRoutes: [
        //dashboard
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/Dashboard'))
            }, 'dashboard')
          }
        },
        {
          path: 'agentDashboard',
          name: 'agentDashboard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/agentDashboard'))
              cb(null, require('./routes/AgentDashboard'))
            }, 'agentDashboard')
          }
        },
        {
          path: 'user',
          name: 'user',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user/user'))
              cb(null, require('./routes/user'))
            }, 'user')
          }
        },
        {
          path: 'agent',
          name: 'agent',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/agent/agent'))
              cb(null, require('./routes/agent'))
            }, 'agent')
          }
        },
        {
          path: 'card',
          name: 'card',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/card/card'))
              cb(null, require('./routes/card'))
            }, 'card')
          }
        },
        {
          path: 'sale',
          name: 'sale',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sale/sale'))
              cb(null, require('./routes/sale'))
            }, 'sale')
          }
        },
        {
          path: 'allot',
          name: 'allot',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/allot/allot'))
              cb(null, require('./routes/allot'))
            }, 'allot')
          }
        },
        {
          path: 'type',
          name: 'type',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/type/type'))
              cb(null, require('./routes/type'))
            }, 'type')
          }
        },
        {
          path: 'video',
          name: 'video',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/video/video'))
              cb(null, require('./routes/video'))
            }, 'video')
          }
        },
        //no-power
        {
          path: 'no-power',
          name: 'no-power',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/NoPower'))
            }, 'no-power')
          }
        }
      ]
    },
    //login
    {
      path: 'login',
      name: 'login',
      onEnter: redirectToDashboard,
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Login'))
        }, 'login')
      }
    },
    //*
    {
      path: '*',
      name: 'error',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Error'))
        }, 'error')
      }
    }
  ]

  return <Router history={history} routes={routes}/>
}
