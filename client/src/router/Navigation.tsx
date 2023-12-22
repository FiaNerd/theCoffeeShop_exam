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
        url: '/bryggkaffe',
      },
      {
        title: 'Hela bönor',
        url: '/hela bönor',
      },
      {
        title: 'Presskaffe',
        url: 'presskaffe',
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
