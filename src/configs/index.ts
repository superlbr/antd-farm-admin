export const config = {
  siteName: 'Farm Admin',
  copyright: 'Antd Farm Admin  © 2024 ',
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
  links: [
    {
      key: 1,
      title: 'Antd',
      href: 'https://ant.design',
      blankTarget: true,
    },
    {
      key: 2,
      title: 'Farm',
      href: 'https://www.farmfe.org',
      blankTarget: true,
    },
  ]
}
