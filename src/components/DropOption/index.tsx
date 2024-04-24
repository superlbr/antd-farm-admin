import React from 'react'
import { BarsOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, Button, Menu } from 'antd'

const { Item } = Menu

const DropOption = ({
  onMenuClick, menuOptions = [], buttonStyle, dropdownProps, menuText,
}) => {
  const menu = menuOptions.map(item => <Item key={item.key}>{item.name}</Item>)
  return (<Dropdown
    overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
  >
    <Button style={{ border: 'none', ...buttonStyle }}>
      {menuText || <BarsOutlined style={{ marginRight: 2 }} />}
      <DownOutlined />
    </Button>
  </Dropdown>)
}

export default DropOption
