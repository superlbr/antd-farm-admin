import React from 'react'
import { queryLayout } from '@/utils'
import { config } from '@/configs'
import { Outlet } from 'react-router-dom'
import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout/index'
import './BaseLayout.less'

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout,
}

const BaseLayout: React.FC = (props) => {
  const Container = LayoutMap[queryLayout(config.layouts, window.location.pathname)]
  return <Container><Outlet /></Container>
}

export default BaseLayout
