/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import GlobalFooter from '@/components/GlobalFooter'
import { Header, Bread, Sider } from '@/components/Layout'
import { Drawer, FloatButton, Layout } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { useDispatch, useSelector } from 'react-redux'
import { pathToRegexp } from 'path-to-regexp'
import { config } from '@/configs'
import styles from './PrimaryLayout.module.less'

const { Content } = Layout

function PrimaryLayout({ children }) {
  let enquireHandler

  state = {
    isMobile: false,
  }

  useEffect() {
    enquireHandler = enquireScreen((mobile: boolean) => {
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        })
      }
    })
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }

  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    })
  }

  render() {
    const { user, theme, routeList, permissions, collapsed, notifications } = app
    const { isMobile } = this.state
    const { onCollapseChange } = this

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

    const headerProps = {
      user,
      menus,
      collapsed,
      notifications,
      onCollapseChange,
      fixed: config.fixedHeader,
      onUpdateNotifications(id) {
        dispatch({
          type: 'app/notificationUpdate',
          payload: { id, status: 0 },
        })
      },
      onFindallNotifications() {
        history.push({
          pathname: `/account/notification`,
        })
      },
      onSignOut() {
        dispatch({ type: 'app/logout' })
      },
      onUserProfile() {
        history.push({
          pathname: `/account/admin/${user.uid}`,
        })
      },
    }

    const siderProps = {
      menus,
      theme,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
    }
    return (
      (<>
        <Layout>
          {isMobile ? (
            <Drawer
              maskClosable
              closable={false}
              onClose={onCollapseChange.bind(this, !collapsed)}
              open={!collapsed}
              placement="left"
              width={208}
              rootStyle={{
                padding: 0,
                height: '100vh',
              }}
            >
              <Sider {...siderProps} collapsed={false} />
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
              <Bread routeList={routeList} />
              {hasPermission ? children : <Error />}
            </Content>
            <FloatButton.BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout') as HTMLElement}
            />
            <GlobalFooter
              copyright={config.copyright}
              links={config.links}
            />
          </div>
        </Layout>
      </>)
    );
  }
}

export default PrimaryLayout
