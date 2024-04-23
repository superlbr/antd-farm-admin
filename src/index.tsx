import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'

import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import store from './store';
import { router } from './router';
import './index.css';
import useStorage from './hooks/useStorage';

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  function getLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  return <Provider store={store}>
    <ConfigProvider locale={getLocale()}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Index />)
