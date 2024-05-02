import React from 'react'
import { Button, Row, Input, Form } from 'antd'
import { config } from '@/configs'
import { useRequest } from '@/hooks'
import { loginUser, ILoginUserParams } from '@/services'

import styles from './index.module.less'
import logoUrl from '@/assets/logo.svg?inline'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './mock'

const FormItem = Form.Item

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    run: runLogin, 
    loading
  } = useRequest(loginUser, {
    manual: true,
    onSuccess: (res) => {
      if (res.data) {
        dispatch({
          type: 'login',
          payload: res.data,
        })
        const { route_default = '/dashboard' } = res.data
        navigate(route_default)
      } else {
        console.log('登录失败')
      }
    }
  })

  const handleFinish = (values: ILoginUserParams) => {
    runLogin(values)
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={logoUrl} />
        <span>{config.siteName}</span>
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
            <span>
              Username：guest
            </span>
            <span>
              Password：guest
            </span>
          </p>
        </Row>
      </Form>
    </div>
  )
}

export default Login
