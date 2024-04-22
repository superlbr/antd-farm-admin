import React, { PureComponent } from 'react'
import { BulbOutlined } from '@ant-design/icons'
import { Switch, Layout } from 'antd'
import ScrollBar from '../ScrollBar'
import { config } from '@/configs'
import SiderMenu from './Menu'
import styles from './Sider.less'
import { useDispatch } from 'react-redux'

function Sider({ menus, theme, isMobile, collapsed, onCollapseChange }) {
  const dispatch = useDispatch()

  const onThemeChange = (newTheme: string) => {
    dispatch({
      type: 'updateState',
      payload: {
        key: 'settings',
        params: {
          theme: newTheme,
        }
      },
    })

    return newTheme
  }

  return (
    <Layout.Sider
      width={186}
      theme={theme}
      // breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onBreakpoint={!isMobile ? onCollapseChange : (broken) => { }}
      className={styles.sider}
    >
      <div className={styles.brand}>
        <div className={styles.logo}>
          <img alt="logo" src={config.logo} />
          {!collapsed && <h1>{config.siteName}</h1>}
        </div>
      </div>
      <div className={styles.menuContainer}>
        <ScrollBar
          options={{
            // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
            suppressScrollX: true,
          }}
        >
          <SiderMenu
            menus={menus}
            theme={theme}
            collapsed={collapsed}
            isMobile={isMobile}
            onCollapseChange={onCollapseChange}
          />
        </ScrollBar>
      </div>
      {!collapsed && (
        <div className={styles.switchTheme}>
          <span>
            <BulbOutlined />切换主题
          </span>
          <Switch
            onChange={onThemeChange(
              theme === 'dark' ? 'light' : 'dark'
            )}
            defaultChecked={theme === 'dark'}
            checkedChildren={'暗'}
            unCheckedChildren={'亮'}
          />
        </div>
      )}
    </Layout.Sider>
  )
}

export default Sider
