/*
 * Note:
 * Menu items with children need to set a key starting with "/"
 * @see https://github.com/umijs/route-utils/blob/master/src/transformRoute/transformRoute.ts#L219
 */

const menus = [
  {
    path: '/',
    name: `Dashboard`,
    icon: 'dashboard',
  },
  {
    path: '/user',
    name: `User`,
    icon: 'user',
  },
]

export default menus
