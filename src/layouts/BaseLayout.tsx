import { queryLayout } from '@/utils'
import { config } from '@/configs'
import { Outlet } from 'react-router-dom'
import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout'
import './BaseLayout.less'

const LayoutMap: { [key: string]: React.ElementType } = {
  primary: PrimaryLayout,
  public: PublicLayout,
}

const BaseLayout = () => {
  const curLayout = queryLayout(config.layouts, window.location.pathname)
  const Container = LayoutMap[curLayout]
  return <Container><Outlet /></Container>
}

export default BaseLayout
