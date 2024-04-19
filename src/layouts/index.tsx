import React from 'react'
import { ConfigProvider } from 'antd'
import {
  useRequest,
} from '@/hooks'
// @ts-ignore
import { Outlet } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom'
import { ConfigContext } from '@/utils/context'
import { queryUserInfo, IUserInfo } from '@/services'
import BaseLayout from './BaseLayout'

const Layout: React.FC = (props) => {
  const {
    data: userInfo,
    run: runQueryUserInfo,
    loading,
  } = useRequest<IUserInfo>(queryUserInfo, {
    onError: (data: any) => {
      if (data.statusCode === 401) {
        window.location.href = '/login'
      }
    },
  })

  const globalConfig = {
    userInfo: userInfo as IUserInfo,
    queryUserInfo: runQueryUserInfo,
  }

  if (loading) {
    return <div>loading</div>
  }

  return (
    <ConfigContext.Provider value={globalConfig}>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <BaseLayout><Outlet /></BaseLayout>
        </BrowserRouter>
      </ConfigProvider>
    </ConfigContext.Provider>
  )
}

export default Layout
