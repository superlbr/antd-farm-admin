import React from 'react'
import { IUserInfo } from '@/services'

interface IConfigContext {
  userInfo: IUserInfo | null
  queryUserInfo: () => void
}

export const ConfigContext = React.createContext<IConfigContext>({
  userInfo: null,
  queryUserInfo: () => null,
})
