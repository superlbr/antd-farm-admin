import {
  PayCircleOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
  ApiOutlined,
  CameraOutlined,
  EditOutlined,
  CodeOutlined,
  LineOutlined,
  BarChartOutlined,
  AreaChartOutlined,
} from '@ant-design/icons'
import React from 'react'
export interface IMenuIcon {
  [key: string]: React.ReactNode
}

const MenuIcon: IMenuIcon = {
  'pay-circle-o': <PayCircleOutlined />,
  'shopping-cart': <ShoppingCartOutlined />,
  'camera-o': <CameraOutlined />,
  'line-chart': <LineOutlined />,
  'code-o': <CodeOutlined />,
  'area-chart': <AreaChartOutlined />,
  'bar-chart': <BarChartOutlined />,
  message: <MessageOutlined />,
  team: <TeamOutlined />,
  dashboard: <DashboardOutlined />,
  user: <UserOutlined />,
  api: <ApiOutlined />,
  edit: <EditOutlined />,
}

export default MenuIcon