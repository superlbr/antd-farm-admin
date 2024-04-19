import React from 'react'
import { useNavigate } from "react-router-dom";
import { ConfigProvider } from 'antd'
import {
  useRequest,
} from '@/hooks'
// @ts-ignore
import { Outlet } from 'umi'
import zhCN from 'antd/locale/zh_CN';

import { ConfigContext } from '@/utils/context'
import { queryUserInfo, IUserInfo } from '@/services'
import BaseLayout from './BaseLayout'

const Layout: React.FC = (props) => {
  const navigate = useNavigate()
  const {
    data: userInfo,
    run: runQueryUserInfo,
    loading,
  } = useRequest<IUserInfo>(queryUserInfo, {
    onError: (data: any) => {
      if (data.statusCode === 401) {
        navigate('/login')
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
        <BaseLayout><Outlet /></BaseLayout>
      </ConfigProvider>
    </ConfigContext.Provider>
  )
}

export default Layout
