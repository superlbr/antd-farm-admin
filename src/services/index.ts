import user, { TUserAPI } from '@/services/user'
import admin, { TAdminAPI } from '@/services/admin'
import createService, { TService } from '@/utils/createService'

const APIs = {
  ...user,
  ...admin,
}

type RecordService<T> = {
  [P in keyof T]: TService
}
type TAPIService = RecordService<TUserAPI>
const APIService = {} as TAPIService
for (const key in APIs) {
  APIService[key] = createService(APIs[key])
}

export const {
  logoutUser,
  queryUser,
  updateUser,
  createUser,
  removeUser,
  removeUserList,
} = APIService

export interface IUserInfo {
  avatar: string
  id: number
  username: string
  permissions: {
    role?: string
    visit?: string[]
  }
}

export const queryUserInfo = createService<IUserInfo>(user.queryUserInfo)

export interface ILoginUserParams {
  password: string
  username: string
}

export const loginUser = createService<any, ILoginUserParams>(user.loginUser)

export interface IUserItem {
  address: string
  age: number
  avatar: string
  createTime: string
  email: string
  id: string
  isMale: boolean
  name: string
  nickName: string
  phone: string
}
export interface IUserListResult {
  list: IUserItem[]
  total: number
}

export interface IQueryUserListParams {
  page?: number
  pageSize?: number
}

export interface IAdminNotificationItem {
  id: number,
  content: string,
  desc?: string,
  level: number,
  route?: string,
  status: number,
}

export interface IAdminNotificationResult {
  list: IAdminNotificationItem[],
  total: number,
}

export const queryUserList = createService<
  IUserListResult,
  IQueryUserListParams
>(user.queryUserList)
export const userUpdate = createService(user.updateUser)
export const userRemove = createService(user.removeUser)

export const queryAdminNotification = createService<IAdminNotificationResult>(
  admin.queryAdminNotificationList,
)
export const adminNotificationUpdate = createService(admin.adminNotificationUpdate)