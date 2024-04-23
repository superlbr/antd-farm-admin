import React from 'react'
import { BulbOutlined } from '@ant-design/icons'
import { Switch, Layout } from 'antd'
import ScrollBar from '../ScrollBar'
import { config } from '@/configs'
import SiderMenu from './Menu'
import styles from './Sider.module.less'
import { useDispatch } from 'react-redux'

function Sider({ menus, theme, isMobile, collapsed }) {
  const dispatch = useDispatch()

  const onCollapseChange = (collapsed: Boolean) => {
    dispatch({
      type: 'updateSetting',
      payload: {
        collapsed,
      },
    })
  }

  const onThemeChange = (theme: string) => {
    dispatch({
      type: 'updateSetting',
      payload: {
        theme
      },
    })

    return theme
  }

  return (
    <Layout.Sider
      width={186}
      theme={theme}
      // breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onBreakpoint={!isMobile ? () => onCollapseChange() : () => {}}
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
            onCollapseChange={() => onCollapseChange()}
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
