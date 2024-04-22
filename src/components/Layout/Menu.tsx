import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import MenuIcon from '@/components/MenuIcon'
import { pathToRegexp } from 'path-to-regexp'
import { NavLink } from 'react-router-dom'
import {
  arrayToTree,
  queryAncestors,
} from '@/utils'
import store from 'store'

const { SubMenu } = Menu

// menuParentId = mpid
// breadcrumbParentId = bpid
class Menus extends PureComponent {
  state = {
    openKeys: store.get('openKeys') || [],
  }

  onOpenChange = openKeys => {
    const { menus=[] } = this.props
    const rootSubmenuKeys = menus.filter(_ => !_.mpid).map(_ => _.id)

    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )

    let newOpenKeys = openKeys
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }
    this.setState({
      openKeys: newOpenKeys,
    })
    store.set('openKeys', newOpenKeys)
  }

  generateMenus = data => {
    return data.map(item => {
      const ItemIcon = MenuIcon[item.icon]
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <Fragment>
                {item.icon && ItemIcon && <ItemIcon /> }
                <span>{item.name}</span>
              </Fragment>
            }
          >
            {this.generateMenus(item.children)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={item.id}>
          <NavLink to={item.route || '#'}>
            {item.icon && ItemIcon && <ItemIcon />}
            <span>{item.name}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }

  render() {
    const { collapsed, theme, menus, location, isMobile, onCollapseChange } = this.props

    // Generating tree-structured data for menu content.
    const menuTree = arrayToTree(menus, 'id', 'bpid')

    // Find a menu that matches the pathname.
    const currentMenu = menus.find(
      _ => _.route && pathToRegexp(_.route).exec(location.pathname)
    )

    // Find the key that should be selected according to the current menu.
    const selectedKeys = currentMenu
      ? queryAncestors(menus, currentMenu, 'mpid').map(_ => `${_.id}`)
      : []
    
    const menuProps = collapsed ? {} : { openKeys: this.state.openKeys }
      
    return (
      <Menu
        mode="inline"
        theme={theme}
        onOpenChange={this.onOpenChange}
        selectedKeys={selectedKeys}
        onClick={
          isMobile ? () => {
            onCollapseChange(true)
          } : undefined
        }
        {...menuProps}
      >
        {this.generateMenus(menuTree)}
      </Menu>
    )
  }
}

Menus.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  onCollapseChange: PropTypes.func,
}

export default Menus
