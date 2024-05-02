import React, { useContext, useState } from 'react'
import {
  ArrowsAltOutlined, BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons'
import { 
  Menu, Layout, Avatar, Popover, Badge, List, Tag, Typography
} from 'antd'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import screenfull from 'screenfull'
import { useNavigate } from 'react-router-dom'

import styles from './Header.module.less'
import { GlobalState } from '@/store'
import { config } from '@/configs'
import { COMMON } from '@/configs/constants'
import defaultAvatar from '@/assets/avatar.jpg'
import { GlobalContext } from '@/context'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'

const { SubMenu } = Menu
const { Paragraph } = Typography;

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const settings = useSelector((state: GlobalState) => state.settings)
  const userInfo = useSelector((state: GlobalState) => state.userInfo)

  const { lang, setLang } = useContext(GlobalContext)
  const [notifications, onUpdateNotifications] = useState([])

  
  const onFindallNotifications = () => {
    navigate(`/account/notification`)
  }

  const onCollapseChange = (collapsed: Boolean) => {
    dispatch({
      type: 'updateSetting',
      payload: {
          collapsed,
      },
    })
  }

  const onSignOut = () => {
    dispatch({
      type: 'logout',
    })
    navigate('/login')
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
    <Menu
      key="language"
      selectedKeys={[lang]}
      onClick={data => {
        setLang(data.key)
      }}
      items={[
        {
          key: 'langList',
          label: lang,
          children: [
            { key: 'zh-CN', label: '中文' },
            { key: 'en-US', label: 'English' }
          ]
        }
      ]}
      mode="horizontal"
    />,
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
              <List.Item className={styles.notificationItem} 
                onClick={() => onDealNotification(item)}>
                <List.Item.Meta
                  title={<Paragraph ellipsis={{ rows: 3 }}>{item.content}</Paragraph>}
                  description={item.date}
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
    <Menu style={{ width: 120 }} key="menu" mode="horizontal" onClick={handleClickMenu}
      items={
        [{
          key: 'User',
          label: <>
          <Avatar style={{ marginRight: 12 }} src={userInfo.avatar ? userInfo.avatar : defaultAvatar } />
          <span>{ userInfo.name }</span>
        </>,
          children: [
            { key: 'Profile', label: '个人信息' },
            { key: 'SignOut', label: '注销' }
          ]
        } as MenuItemType]
      }
      />,
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
        onClick={() => onCollapseChange(!settings.collapsed)}
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
