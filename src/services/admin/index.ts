export type TAdminAPIProperty =
    | 'queryAdminNotificationList'
    | 'adminNotificationUpdate'

export type TAdminAPI = Record<TAdminAPIProperty, string>
export default {
    queryAdminNotificationList: '/admin/notifications',
    adminNotificationUpdate: 'POST /admin/notification/update/:id',
  } as TAdminAPI