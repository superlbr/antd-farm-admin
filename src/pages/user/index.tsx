import React, { useState, useEffect } from 'react'
import { Avatar, Button, Table } from 'antd'
import { Link } from 'react-router-dom';
import { useRequest } from '@/hooks'
import { Page } from '@/components'
import { queryUserList } from '@/services'
import type {
  IUserItem,
  IUserListResult,
  IQueryUserListParams,
} from '@/services'
import { ColumnType } from '@/typings'
import styles from './index.less'

const columns: ColumnType<IUserItem>[] = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    width: '7%',
    fixed: 'left',
    render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
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
      return (
        <>
          <Button type="link">Update</Button>
          <Button type="link">Delete</Button>
        </>
      )
    },
  },
]

const UserPage: React.FC = () => {
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

  const pagination = {
    current,
    pageSize,
    total,
    showTotal: (total) => `Total ${total} Items`,
  }

  return (
    <Page inner>
      <div className={styles.error}>
        <Table
          bordered
          loading={loading}
          dataSource={list}
          columns={columns}
          className={styles.table}
          scroll={{ x: 1200 }}
          rowKey={(record) => record.id}
          pagination={pagination}
          onChange={(page) => {
            setCurrent(page.current as number)
            setPageSize(page.pageSize as number)
          }}
        />
      </div>
    </Page>
  )
}

export default UserPage
