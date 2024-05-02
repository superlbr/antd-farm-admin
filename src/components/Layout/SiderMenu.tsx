import React, { useState } from 'react'
import { Menu } from 'antd'
import Icons from '@/components/Icons'
import { pathToRegexp } from 'path-to-regexp'
import { useNavigate } from 'react-router-dom'
import {
  arrayToTree,
  queryAncestors,
} from '@/utils'
import { useDispatch } from 'react-redux'
import type { MenuTheme } from 'antd/lib/menu'

type MenusProps = {
  menus: any[],
  collapsed: Boolean,
  isMobile: Boolean,
  theme?: MenuTheme,
}

function Menus({ menus, collapsed, isMobile, theme }: MenusProps) {
  const [openKeys, setOpenKeys] = useState([] as string[])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onOpenChange = (openKeys: any[]) => {
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
      return {
        key: item.id,
        icon: item.icon && Icons(item.icon),
        label: item.name,
        children: !item.route && item.children ? generateMenus(item.children) : null,
      }
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
      onOpenChange={onOpenChange}
      selectedKeys={selectedKeys}
      onClick={
        (e) => {
          isMobile && onCollapseChange(true)
        }
      }
      onSelect={
        (e) => {
          const currentMenu = menus.find(_ => _.id == e.key)
          if (currentMenu.route) {
            navigate(currentMenu.route)
            setOpenKeys([e.key])
          } else {
            setOpenKeys(openKeys.includes(e.key) ? [] : [e.key])
          }
        }
      }
      items={ generateMenus(menuTree) }
      {...menuProps}
    />
  )
}

export default Menus
