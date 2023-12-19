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
        url: '#',
      },
      {
        title: 'Helabönor',
        url: '#',
      },
      {
        title: 'Presskaffe',
        url: '#',
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
    subMenu: [],
  },
  {
    title: 'OM BÖNOR',
    url: '#',
    subMenu: [],
  },
]
