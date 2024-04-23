import React, { Fragment, useState } from 'react'
import {
  ArrowsAltOutlined, BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons'
import { Menu, Layout, Avatar, Popover, Badge, List, Tag, Typography } from 'antd'
import { COMMON } from '@/configs/constants'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import screenfull from 'screenfull'
import styles from './Header.module.less'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '@/store'
import { config } from '@/configs'

const { SubMenu } = Menu
const { Paragraph } = Typography;

function Header( onCollapseChange: any ) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const settings = useSelector((state: GlobalState) => state.settings)
  const userInfo = useSelector((state: GlobalState) => state.userInfo)
  
  const [notifications, onUpdateNotifications] = useState([])


  const onFindallNotifications = () => {
    navigate(`/account/notification`)
  }

  const onSignOut = () => {
    dispatch({ type: 'app/logout' })
  }
  const onUserProfile = () => {
    navigate(`/account/admin/${userInfo.uid}`)
  }

  const handleClickMenu = (e: { key: string }) => {
    e.key === 'SignOut' && onSignOut()
    e.key === 'Profile' && onUserProfile()
  }

  const onScreenFull = () => {
    if (screenfull.isEnabled) screenfull.toggle()
  }

  const onDealNotification = item => {
    if (item.route) {
      window.open(item.route)
    }
  }

  const rightContent = [
    <div key="fullscreen" className={styles.button}>
      <ArrowsAltOutlined onClick={onScreenFull} />
    </div>,
    <Popover
      placement="bottomRight"
      trigger="click"
      key="notifications"
      overlayClassName={styles.notificationPopover}
      getPopupContainer={() => document.querySelector('#layoutHeader')! as HTMLElement}
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
                <List.Item.Meta onClick={() => onDealNotification(item)}
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
            <Avatar style={{ marginRight: 12 }} src={userInfo.avatar ? (userInfo.avatar + '?x-oss-process=image/resize,m_fixed,h_300,w_300') : ''} />
            <span>{userInfo.name}</span>
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
        [styles.fixed]: config.fixedHeader,
        [styles.collapsed]: settings.collapsed,
      })}
      id="layoutHeader"
    >
      <div
        className={styles.button}
        onClick={onCollapseChange(!settings.collapsed)}
      >
        { settings.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.rightContainer}>
        {rightContent}
      </div>
    </Layout.Header>
  )
}

export default Header
