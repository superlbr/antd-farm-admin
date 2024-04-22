import React from 'react'
import { Button, Row, Input, Form } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { config } from '@/configs'
import { useRequest, useConfig } from '@/hooks'
import { loginUser, ILoginUserParams } from '@/services'

import styles from './index.module.less'
import logoUrl from '@/assets/logo.svg?inline'

const FormItem = Form.Item

const footerLinks = [
  {
    key: 'github',
    title: <GithubOutlined />,
    href: 'https://github.com/zuiidea/antd-admin',
    blankTarget: true,
  },
]

const Login: React.FC = () => {
  const { run: runLogin, loading } = useRequest(loginUser, {
    manual: true,
  })

  const { queryUserInfo } = useConfig()

  const handleFinish = (values: ILoginUserParams) => {
    runLogin(values).then(() => {
      queryUserInfo()
      window.location.replace('/user')
    })
  }

  return (
    <>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src={logoUrl} />
          <span>{config.title}</span>
        </div>
        <Form onFinish={handleFinish}>
          <FormItem
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            hasFeedback
          >
            <Input placeholder={`Username`} />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password placeholder={`Password`} />
          </FormItem>
          <Row>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Sign in
            </Button>
            <p>
              <span className="margin-right">
                Username：guest
              </span>
              <span>
                Password：guest
              </span>
            </p>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default Login
