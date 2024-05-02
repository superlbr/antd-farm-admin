import React, { useState, useEffect } from 'react'
import { Avatar, Modal, Table } from 'antd'
import DropOption from '@/components/DropOption';
import { Link } from 'react-router-dom';
import { useLocale, useRequest } from '@/hooks'
import { queryUserList, userUpdate, userRemove } from '@/services'
import type {
  IUserItem,
  IUserListResult,
  IQueryUserListParams,
} from '@/services'
import type { ColumnType } from 'antd/lib/table/interface'
import styles from './index.less'
import './mock'

const { confirm } = Modal

function UserPage() {
  const t = useLocale()
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const {
    data: { list, total },
    loading,
    run: runQueryUserList,
  } = useRequest<IUserListResult, IQueryUserListParams>(queryUserList, {
    initialData: {
      list: [],
      total: 0,
    },
    manual: true,
  })

  useEffect(() => {
    runQueryUserList({
      page: current,
      pageSize,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, pageSize])

  const updateUser = (values: any) => {
    userUpdate({
      ...values,
      name: 'MockUser',
    }).then(() => {
      runQueryUserList({
        page: current,
        pageSize,
      })
    })
  }

  const onDeleteItem = (id: string) => {
    userRemove({
      id,
    }).then(() => {
      runQueryUserList({
        page: current,
        pageSize,
      })
    })
  }

  const handleMenuClick = (record: IUserItem, e: { key: string }) => {
    if (e.key === '1') {
      updateUser(record)
    } else if (e.key === '2') {
      confirm({
        title: '确认要删除该记录吗？?',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns: ColumnType<IUserItem>[] = [
    {
      title: t['column.avatar'],
      dataIndex: 'avatar',
      key: 'avatar',
      width: '7%',
      fixed: 'left',
      render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
    },
    {
      title: t['column.name'],
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/user/info/${record.id}`}>{text}</Link>,
    },
    {
      title: 'NickName',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: '6%',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'isMale',
      key: 'isMale',
      width: '7%',
      render: (text) => <span>{text ? 'Male' : 'Female'}</span>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ellipsis: true,
      key: 'address',
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: 'Operation',
      key: 'operation',
      fixed: 'right',
      width: '12%',
      render: (text, record) => {
        return (<DropOption
          onMenuClick={e => handleMenuClick(record, e)}
          menuOptions={[
            {
              key: '1',
              name: '修改',
            }, {
              key: '2',
              name: '删除',
            }
          ]}
        />)
      },
    },
  ]

  const pagination = {
    current,
    pageSize,
    total,
    showTotal: (total: number) => `Total ${total} Items`,
  }

  return (
    <div className={styles.table}>
      <Table
        bordered
        loading={loading}
        dataSource={list}
        columns={columns}
        className={styles.table}
        scroll={{ x: 1200 }}
        rowKey={(record: { id: any; }) => record.id}
        pagination={pagination}
        onChange={(page: { current: number; pageSize: number }) => {
          setCurrent(page.current as number)
          setPageSize(page.pageSize as number)
        }}
      />
    </div>
  )
}

export default UserPage

