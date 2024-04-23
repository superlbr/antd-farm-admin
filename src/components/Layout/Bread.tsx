import React from 'react'
import { Breadcrumb } from 'antd'
import MenuIcon from '@/components/MenuIcon'
import { Link } from 'react-router-dom'
import { pathToRegexp } from 'path-to-regexp'
import { queryAncestors } from '@/utils'
import styles from './Bread.less'

function Bread({ routeList, location }) {
  const generateBreadcrumbs = (paths = []) => {
    return paths.filter(x => x).map((item, key) => {
      const ItemIcon = MenuIcon[item.icon]
      const content = (
        <>
          {item.icon && ItemIcon &&
            <ItemIcon style={{ marginRight: 4 }} />}
          {item.name}
        </>
      )

      return (
        <Breadcrumb.Item key={key}>
          {paths.length - 1 !== key ?
            <Link to={item.route || '#'}>{content}</Link> : content}
        </Breadcrumb.Item>
      )
    })
  }

  // Find a route that matches the pathname.
  const currentRoute = routeList.find(
    _ => _.route && pathToRegexp(_.route).exec(location.pathname)
  )

  // Find the breadcrumb navigation of the current route match and all its ancestors.
  const paths = currentRoute
    ? queryAncestors(routeList, currentRoute, 'bpid').reverse()
    : [
      routeList[0],
      {
        id: 404,
        name: 'Not Found',
      },
    ]

  return (
    <Breadcrumb className={styles.bread}>
      {generateBreadcrumbs(paths)}
    </Breadcrumb>
  )
}

export default Bread
