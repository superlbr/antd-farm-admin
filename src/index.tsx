import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'

import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import store from './store';
import { GlobalContext } from './context';
import { router } from './router';
import './index.less';
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

  // 检查登录状态
  useEffect(() => {
    if (localStorage.getItem('userStatus') === 'login') {
      // fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, [])

  const contextValue = {
    lang,
    setLang,
  };

  return <Provider store={store}>
    <GlobalContext.Provider value={contextValue}>
      <ConfigProvider locale={getLocale()}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </GlobalContext.Provider>
  </Provider>
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Index />)
