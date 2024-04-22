import React, { Fragment } from 'react'
import { 
  ArrowsAltOutlined, BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons'
import { Menu, Layout, Avatar, Popover, Badge, List, Tag, Typography } from 'antd'
import { COMMON } from 'utils/constant'
import classnames from 'classnames'
import * as screenfull from 'screenfull'
import styles from './Header.less'

const { SubMenu } = Menu
const { Paragraph } = Typography;

function Header () {
  const handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
    e.key === 'Profile' && this.props.onUserProfile()
  }

  const screenFull = () => {
    if (screenfull.isEnabled) screenfull.toggle()
  }

  const onDealNotification = item => {
    if (item.route) {
      window.open(item.route)
    } else if (item.bill_id) {
      window.open(`/bill/trade/${item.bill_id}`)
    }
  }
  
    const {
      fixed,
      user,
      collapsed,
      notifications = [],
      onCollapseChange,
      onUpdateNotifications,
      onFindallNotifications,
    } = this.props

    const rightContent = [
      <div key="fullscreen" className={styles.button}>
        <ArrowsAltOutlined onClick={this.screenFull} />
      </div>,
      <Popover
        placement="bottomRight"
        trigger="click"
        key="notifications"
        overlayClassName={styles.notificationPopover}
        getPopupContainer={() => document.querySelector('#layoutHeader')}
        content={
          <div className={styles.notification}>
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              locale={{
                emptyText: '没有新的通知',
              }}
              renderItem={item => (
                <List.Item className={styles.notificationItem}>
                  <List.Item.Meta onClick={() => this.onDealNotification(item)}
                    title={<Paragraph ellipsis={{ rows: 3 }}>{item.content}</Paragraph>}
                    description={item.date || `周${COMMON.week[item.week]}`}
                  />
                  <Tag
                    closable
                    onClose={() => onUpdateNotifications(item.id)}
                    color={COMMON.tags[item.level].color}>{COMMON.tags[item.level].info}</Tag>
                </List.Item>
              )}
            />
            <div
              onClick={onFindallNotifications}
              className={styles.findAllButton}
            >查看全部通知
                 </div>
          </div>
        }
      >
        <Badge
          count={notifications.length}
          offset={[-10, 10]}
          className={styles.iconButton}
        >
          <BellOutlined className={styles.iconFont} />
        </Badge>
      </Popover>,
      <Menu key="menu" mode="horizontal" onClick={handleClickMenu}>
        <SubMenu
          key="User"
          title={
            <Fragment>
              <Avatar style={{ marginRight: 12 }} src={user.avatar ? (user.avatar + '?x-oss-process=image/resize,m_fixed,h_300,w_300') : ''} />
              <span>{user.name}</span>
            </Fragment>
          }
        >
          <Menu.Item key="Profile">个人信息</Menu.Item>
          <Menu.Item key="SignOut">注销</Menu.Item>
        </SubMenu>
      </Menu>,
    ]
    
    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
        id="layoutHeader"
      >
        <div
          className={styles.button}
          onClick={onCollapseChange(!collapsed)}
        >
          { collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
        </div>
        <div className={styles.rightContainer}>
          {rightContent}
        </div>
      </Layout.Header>
    )
}

export default Header
