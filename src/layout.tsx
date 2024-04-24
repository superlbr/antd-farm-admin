/* global window */
/* global document */
import React, { useEffect, useState } from 'react'
import { Header, Sider, Footer } from '@/components/Layout'
import {
  Breadcrumb, Drawer, FloatButton, Layout
} from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Link, useLocation } from 'react-router-dom';
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
  const location = useLocation()

  const settings = useSelector((state: GlobalState) => state.settings)
  const routeList = useSelector((state: GlobalState) => state.routeList)
  const permissions = useSelector((state: GlobalState) => state.permissions)
  const user = useSelector((state: GlobalState) => state.userInfo)

  const [hasPermission, setHasPermission] = useState(false)
  const [breadList, setBreadList] = useState([])

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
  }, [])

  const onCollapseChange = (collapsed: Boolean) => {
    dispatch({
      type: 'updateSetting',
      payload: {
        collapsed,
      },
    })
  }

  // mpid is equal to -1 is not a available menu.
  const menus = routeList.filter(_ => _.mpid !== -1)

  // Find the breadcrumb navigation of the current route match and all its ancestors.
  useEffect(() => {
    // Find a route that matches the pathname.
    const currentRoute = routeList.find(
      _ => _.route && pathToRegexp(_.route).exec(location.pathname)
    )

    // Query whether you have permission to enter this page
    setHasPermission(currentRoute ? permissions.includes(currentRoute.id) : false)
    const paths = currentRoute
      ? queryAncestors(routeList, currentRoute, 'bpid').reverse()
      : [
        routeList[0],
        {
          id: 404,
          name: 'Not Found',
        },
      ]
    
    const breadcrumbList = generateBreadcrumbs(paths)
    setBreadList(breadcrumbList)
  }, [location, routeList, permissions])

  const generateBreadcrumbs = (paths = []) => {
    return paths.filter(x => x).map((item, key) => {
      const content = (
        <>
          {item.icon &&
            Icons(item.icon)}
          <span style={{ marginLeft: 4 }}>{item.name}</span>
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
            {breadList}
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
