/* global window */
/* global document */
import React, { useEffect } from 'react'
import { Header, Sider, Footer } from '@/components/Layout'
import { 
  Breadcrumb, Drawer, FloatButton, Layout
} from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Link } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp'
import { config } from '@/configs'
import { queryAncestors } from '@/utils'
import Icons from '@/components/Icons'
import styles from './layout.module.less'
import { GlobalState } from '@/store';
import NotFoundPage from './pages/404';

const { Content } = Layout

function DefaultLayout() {
  let enquireHandler: any

  const dispatch = useDispatch()

  const settings = useSelector((state: GlobalState) => state.settings)
  const routeList = useSelector((state: GlobalState) => state.routeList)
  const permissions = useSelector((state: GlobalState) => state.permissions)
  const user = useSelector((state: GlobalState) => state.userInfo)

  useEffect(() => {
    enquireHandler = enquireScreen((mobile: boolean) => {
      if (settings.isMobile !== mobile) {
        dispatch({
          type: 'updateSetting',
          payload: {
            isMobile: mobile,
          },
        })
      }
    })

    return () => {
      unenquireScreen(enquireHandler)
    }
  }, [settings.isMobile])

  const onCollapseChange = (collapsed: Boolean) => {
    dispatch({
      type: 'updateSetting',
      payload: {
          collapsed,
      },
    })
  }

  // Find a route that matches the pathname.
  const currentRoute = routeList.find(
    _ => _.route && pathToRegexp(_.route).exec(location.pathname)
  )

  // Query whether you have permission to enter this page
  const hasPermission = currentRoute
    ? permissions.includes(currentRoute.id)
    : false

  // mpid is equal to -1 is not a available menu.
  const menus = routeList.filter(_ => _.mpid !== -1)

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

  const generateBreadcrumbs = (paths = []) => {
    return paths.filter(x => x).map((item, key) => {
      const ItemIcon = Icons[item.icon]
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

  const headerProps = {
    user,
    menus,
    collapsed: settings.collapsed,
    fixed: config.fixedHeader,
  }

  const siderProps = {
    menus,
    theme: settings.theme,
    isMobile: settings.isMobile,
    collapsed: settings.collapsed,
    onCollapseChange,
  }
  
  return (
    <Layout>
      {settings.isMobile ? (
        <Drawer
          maskClosable
          closable={false}
          onClose={() => onCollapseChange(!settings.collapsed)}
          open={!settings.collapsed}
          placement="left"
          width={228}
          rootStyle={{
            padding: 0,
            height: '100vh',
          }}
        >
          <Sider {...siderProps} />
        </Drawer>
      ) : (
        <Sider {...siderProps} />
      )}
      <div
        className={styles.container}
        style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
        id="primaryLayout"
      >
        <Header {...headerProps} />
        <Content className={styles.content}>
          <Breadcrumb className={styles.bread}>
            {generateBreadcrumbs(paths)}
          </Breadcrumb>
          {hasPermission ? <Outlet /> : <NotFoundPage />}
        </Content>
        <FloatButton.BackTop
          className={styles.backTop}
          target={() => document.querySelector('#primaryLayout') as HTMLElement}
        />
        <Footer
          copyright={config.copyright}
          links={config.links}
        />
      </div>
    </Layout>
  )
}

export default DefaultLayout
