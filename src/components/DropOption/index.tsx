import React from 'react'
import { BarsOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, Button } from 'antd'
import type { MenuProps } from 'antd'

interface DropOptionProps {
  onMenuClick: (e: any) => void
  menuOptions: { key: string, name: string }[]
  buttonStyle?: React.CSSProperties
  dropdownProps?: any
  menuText?: React.ReactNode
}

const DropOption = ({
  onMenuClick, menuOptions, buttonStyle, dropdownProps, menuText,
}: DropOptionProps) => {
  const items: MenuProps['items'] = menuOptions.map(item => { return {
    label: item.name, key: item.key 
  }})

  return (<Dropdown
    menu = {{
      items,
      onClick: onMenuClick
    }}
    {...dropdownProps}
  >
    <Button style={{ border: 'none', ...buttonStyle }}>
      {menuText || <BarsOutlined style={{ marginRight: 2 }} />}
      <DownOutlined />
    </Button>
  </Dropdown>)
}

export default DropOption
