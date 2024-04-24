import React, { useState } from 'react'
import { Menu } from 'antd'
import Icons from '@/components/Icons'
import { pathToRegexp } from 'path-to-regexp'
import { NavLink } from 'react-router-dom'
import {
  arrayToTree,
  queryAncestors,
} from '@/utils'
import { useDispatch } from 'react-redux'

const { SubMenu } = Menu

// menuParentId = mpid
// breadcrumbParentId = bpid
function Menus({ menus = [], collapsed, isMobile, theme }) {
  const [openKeys, setOpenKeys] = useState([])
  const dispatch = useDispatch()

  const onOpenChange = openKeys => {
    const rootSubmenuKeys = menus.filter(_ => !_.mpid).map(_ => _.id)

    const latestOpenKey = openKeys.find(
      key => openKeys.indexOf(key) === -1
    )

    let newOpenKeys = openKeys
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }
    setOpenKeys(newOpenKeys)
  }

  const onCollapseChange = (collapsed: Boolean) => {
    dispatch({
      type: 'updateSetting',
      payload: {
        collapsed,
      },
    })
  }

  const generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <>
                { item.icon && Icons(item.icon)}
                <span>{item.name}</span>
              </>
            }
          >
            {generateMenus(item.children)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={item.id}>
          <NavLink to={item.route || '#'}>
            {item.icon && Icons(item.icon)}
            <span>{item.name}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }

  // Generating tree-structured data for menu content.
  const menuTree = arrayToTree(menus, 'id', 'bpid')

  // Find a menu that matches the pathname
  const currentMenu = menus.find(
    _ => _.route && pathToRegexp(_.route).exec(location.pathname)
  )

  // Find the key that should be selected according to the current menu.
  const selectedKeys = currentMenu
    ? queryAncestors(menus, currentMenu, 'mpid').map(_ => `${_.id}`)
    : []

  const menuProps = collapsed ? {} : { openKeys }

  return (
    <Menu
      mode="inline"
      theme={theme}
      onOpenChange={() => onOpenChange}
      selectedKeys={selectedKeys}
      onClick={
        (e) => {
          isMobile && onCollapseChange(true)
        }
      }
      {...menuProps}
    >
      {generateMenus(menuTree)}
    </Menu>
  )
}

export default Menus
