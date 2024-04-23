import React from 'react' // don't forget to import React
import { ConfigProvider } from 'antd'
// @ts-ignore
import { Outlet } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN';
import { RouterProvider } from 'react-router-dom'
import { router } from './router';

const Layout = () => {
  // if (loading) {
  //   return <div>loading</div>
  // }

  return (
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} />
      </ConfigProvider>
  )
}

export default Layout
