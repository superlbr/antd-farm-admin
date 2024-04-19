import React from 'react'
import { Dropdown, Menu, Avatar } from 'antd'
import { history } from 'umi'
import { useRequest, useConfig } from '@/hooks'
import { logoutUser } from '@/services'
import styles from './index.less'

const { SubMenu } = Menu

const NotFoundPage: React.FC = () => {
  const { userInfo } = useConfig()
  const { run: runLogoutUser } = useRequest(logoutUser, {
    manual: true,
    onSuccess: () => history.push('/login'),
  })

  return (
    <>
      <Menu key="user" mode="horizontal">
        <SubMenu
          title={
            <>
              <span style={{ color: '#999', marginRight: 4 }}>
                Hi,
              </span>
              <span>{userInfo?.username}</span>
              <Avatar style={{ marginLeft: 8 }} src={userInfo?.avatar} />
            </>
          }
        >
          <Menu.Item key="SignOut" onClick={() => runLogoutUser()}>
            Sign out
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  )
}

export default NotFoundPage
