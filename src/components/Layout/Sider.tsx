import React from 'react'
import { BulbOutlined } from '@ant-design/icons'
import { Switch, Layout } from 'antd'
import ScrollBar from '../ScrollBar'
import { config } from '@/configs'
import SiderMenu from './Menu'
import styles from './Sider.module.less'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '@/store'
import LogoUrl from '@/assets/logo.svg?inline'

function Sider({ menus }) {
  const dispatch = useDispatch()
  const settings = useSelector((state: GlobalState) => state.settings)

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
      theme={settings.theme}
      // breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={settings.collapsed}
      onBreakpoint={!settings.isMobile ? () => onCollapseChange(settings.collapsed) : () => {}}
      className={styles.sider}
    >
      <div className={styles.brand}>
        <div className={styles.logo}>
          <img alt="logo" src={LogoUrl} />
          {!settings.collapsed && <h1>{config.siteName}</h1>}
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
            theme={settings.theme}
            collapsed={settings.collapsed}
            isMobile={settings.isMobile}
          />
        </ScrollBar>
      </div>
      {!settings.collapsed && (
        <div className={styles.switchTheme}>
          <span>
            <BulbOutlined />切换主题
          </span>
          <Switch
            onChange={() => onThemeChange(
              settings.theme === 'dark' ? 'light' : 'dark'
            )}
            defaultChecked={settings.theme === 'dark'}
            checkedChildren={'暗'}
            unCheckedChildren={'亮'}
          />
        </div>
      )}
    </Layout.Sider>
  )
}

export default Sider
