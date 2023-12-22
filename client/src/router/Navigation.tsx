interface MenuItem {
  title: string
  url: string
  subMenu?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    title: 'KAFFE',
    url: '/',
    subMenu: [
      {
        title: 'All Kaffe',
        url: '/',
      },
      {
        title: 'Bryggkaffe',
        url: '/product/bryggkaffe',
      },
      {
        title: 'Hela bönor',
        url: '/product/hela bönor',
      },
      {
        title: 'Presskaffe',
        url: '/product/presskaffe',
      },
      {
        title: 'Ekologiskt',
        url: '#',
      },
    ],
  },
  {
    title: 'OM OSS',
    url: '#',
  },
  {
    title: 'OM BÖNOR',
    url: '#',
  },
]
