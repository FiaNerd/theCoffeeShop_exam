interface MenuItem {
  title: string
  url: string
  subMenu?: MenuItem[]
  mobileOnly?: boolean
}

export const menuItems: MenuItem[] = [
  {
    title: 'KAFFE',
    url: '/',
    subMenu: [
      {
        title: 'All Kaffe',
        url: '/',
        mobileOnly: false
      },
      {
        title: 'Bryggkaffe',
        url: '/produkt/bryggkaffe',
        mobileOnly: false
      },
      {
        title: 'Hela bönor',
        url: '/produkt/' + encodeURIComponent('hela bönor'),
        mobileOnly: false
      },
      {
        title: 'Presskaffe',
        url: '/produkt/presskaffe',
        mobileOnly: false
      },
      {
        title: 'Ekologiskt',
        url: '/produkt/ekologiskt',
        mobileOnly: false
      },
    ],
  },
  {
    title: 'OM OSS',
    url: '#',
    mobileOnly: false
  },
  {
    title: 'OM BÖNOR',
    url: '#',
    mobileOnly: false
  },
  {
    title: 'Logga in',
    url: '/konto/logga-in',
    mobileOnly: true
  },
  {
    title: 'Skapa konto',
    url: '/konto/register',
    mobileOnly: true
  }
]
