import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import { menu, getMenu, Cookie } from '../../../utils'
import Immutable from 'immutable'

function Menus ({ siderFold, darkTheme, location, isNavbar, handleClickNavMenu, navOpenKeys, userPower, changeOpenKeys }) {

  const topMenus = menu.map(item => item.key)

  const getMenus = (menuArray, siderFold, parentPath = '/') => {

    return menuArray.map(item => {
      const linkTo = parentPath +item.key
      if (item.children) {
        return (
          <Menu.SubMenu key={linkTo} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
            {getMenus(item.children, siderFold, linkTo + '/')}
          </Menu.SubMenu>
        )
      } else {
        return (
          <Menu.Item key={linkTo}>
            <Link to={linkTo}>
              {item.icon ? <Icon type={item.icon} /> : ''}
              {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
            </Link>
          </Menu.Item>
        )
      }
    })
  }
  const agentType = Cookie.get('agent_type');
  const menuItems = getMenus(agentType === '0' ? menu[0] : menu[1], siderFold)

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1))

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }

  const getAncestorKeys = (key) => {
    const map = {
      // navChildParent: ['navParent'],
      '/navigation/navigation2': ['/navigation']
    }
    return map[key] || []
  }

  //菜单栏收起时，不能操作openKeys
  let menuProps = !siderFold ? {
    onOpenChange: onOpenChange,
    openKeys: navOpenKeys
  } : {}

  return (
    <QueueAnim delay={400} type='left'>
      <Menu
        key='1'
        {...menuProps}
        mode={siderFold ? 'vertical' : 'inline'}
        theme={darkTheme ? 'dark' : 'light'}
        onClick={handleClickNavMenu}
        defaultSelectedKeys={[location.pathname !== "/" ? location.pathname : '/dashboard']}>
        {menuItems}
      </Menu>
    </QueueAnim>
  )
}

export default Menus
