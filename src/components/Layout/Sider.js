import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { BulbOutlined } from '@ant-design/icons'
import { Switch, Layout } from 'antd'
import ScrollBar from '../ScrollBar'
import config from 'utils/config'
import SiderMenu from './Menu'
import styles from './Sider.less'

class Sider extends PureComponent {
  render() {
    const {
      menus,
      theme,
      isMobile,
      collapsed,
      onThemeChange,
      onCollapseChange,
    } = this.props

    return (
      <Layout.Sider
        width={186}
        theme={theme}
        // breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={!isMobile ? onCollapseChange : (broken) => {}}
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
              onChange={onThemeChange.bind(
                this,
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
}

Sider.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  onThemeChange: PropTypes.func,
  onCollapseChange: PropTypes.func,
}

export default Sider
