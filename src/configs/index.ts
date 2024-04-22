import { IConfig } from '@/typings'

export const config: IConfig = {
  title: 'Antd Farm Admin',
  copyright: 'Ant Design Admin  © 2024 superlbr',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/\/login/],
    },
  ],
}
