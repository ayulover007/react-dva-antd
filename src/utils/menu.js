//power = { 1: "查看菜单", 2: "查看详情", 3: "新增", 4: "修改", 5: "删除", 6: "审核", 7: "上传" }
//options = { MENU: "查看菜单", DETAIL: "查看详情", ADD: "新增", UPDATE: "修改", DELETE: "删除", CHECK: "审核", UPLOAD: "上传" }
import _ from 'lodash'

const menu = [[
  //dashboard
  {
    id: _.uniqueId(),
    key: 'dashboard',
    name: '首页',
    icon: 'laptop'
  },
  {
    id: _.uniqueId(),
    key: 'user',
    name: '注册用户管理',
    icon: 'user'
  },
  {
    id: _.uniqueId(),
    key: 'type',
    name: '分类管理',
    icon: 'appstore'
  },
  {
    id: _.uniqueId(),
    key: 'video',
    name: '视频管理',
    icon: 'video-camera'
  },
  {
    id: _.uniqueId(),
    key: 'agent',
    name: '代理商管理',
    icon: 'solution'
  },
  {
    id: _.uniqueId(),
    key: 'card',
    name: '卡密管理',
    icon: 'credit-card'
  },
  {
    id: _.uniqueId(),
    key: 'sale',
    name: '营销记录',
    icon: 'area-chart'
  },
  {
    id: _.uniqueId(),
    key: 'allot',
    name: '分销记录',
    icon: 'fork'
  },
],[
  //dashboard
  {
    id: _.uniqueId(),
    key: 'agentDashboard',
    name: '首页',
    icon: 'laptop'
  },
  {
    id: _.uniqueId(),
    key: 'user',
    name: '注册用户管理',
    icon: 'user'
  },
  {
    id: _.uniqueId(),
    key: 'agent',
    name: '代理商管理',
    icon: 'solution'
  },
  {
    id: _.uniqueId(),
    key: 'card',
    name: '卡密管理',
    icon: 'credit-card'
  },
  {
    id: _.uniqueId(),
    key: 'allot',
    name: '分销记录',
    icon: 'fork'
  },
]]

export default menu
