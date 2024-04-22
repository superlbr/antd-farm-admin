import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import { Icons } from 'components'
import { Link, withRouter } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { queryAncestors } from 'utils'
import styles from './Bread.less'

class Bread extends PureComponent {
  generateBreadcrumbs = (paths = []) => {
    return paths.filter(x=>x).map((item, key) => {
      const ItemIcon = Icons[item.icon]
      const content  = (
        <Fragment>
          {item.icon && ItemIcon &&
             <ItemIcon style={{ marginRight: 4 }} />}
          {item.name}
        </Fragment>
      )

      return (
        <Breadcrumb.Item key={key}>
          {paths.length - 1 !== key ? 
            <Link to={item.route || '#'}>{content}</Link> : content}
        </Breadcrumb.Item>
      )
    })
  }

  render() {
    const { routeList, location } = this.props

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
        {this.generateBreadcrumbs(paths)}
      </Breadcrumb>
    )
  }
}

Bread.propTypes = {
  routeList: PropTypes.array,
}

export default Bread
