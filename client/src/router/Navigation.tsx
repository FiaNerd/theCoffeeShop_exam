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
        url: '/products/bryggkaffe',
      },
      {
        title: 'Hela bönor',
        url: '/products/' + encodeURIComponent('hela bönor'),
      },
      {
        title: 'Presskaffe',
        url: '/products/presskaffe',
      },
      {
        title: 'Ekologiskt',
        url: '/products/ekologiskt',
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
