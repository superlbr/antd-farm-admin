import { IConfig } from '@/typings'

export const config: IConfig = {
  title: 'Antd Farm Admin',
  logo: 'logo.svg',
  copyright: 'Ant Design Admin  © 2024 superlbr',
  apiPrefix: '/api/v1',

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/\/login/],
    },
  ],
}
