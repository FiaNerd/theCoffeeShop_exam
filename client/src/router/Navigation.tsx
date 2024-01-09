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
        url: '/produkt/bryggkaffe',
      },
      {
        title: 'Hela bönor',
        url: '/produkt/' + encodeURIComponent('hela bönor'),
      },
      {
        title: 'Presskaffe',
        url: '/produkt/presskaffe',
      },
      {
        title: 'Ekologiskt',
        url: '/produkt/ekologiskt',
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
