import React from 'react'
import { Menu, Avatar } from 'antd'
import { useNavigate } from "react-router-dom";
import { useRequest, useConfig } from '@/hooks'
import { logoutUser } from '@/services'

const { SubMenu } = Menu

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  const { userInfo } = useConfig()
  const { run: runLogoutUser } = useRequest(logoutUser, {
    manual: true,
    onSuccess: () => navigate('/login'),
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
