import { NavLink } from 'react-router-dom'

interface SubMenu {
  title: string
  url: string
}

interface IProps {
  subMenuItems: SubMenu[]
}
const portalRoot = document.getElementById('nav-root')

if (!portalRoot) {
  throw new Error('Portal root element not found')
}

const Dropdown = ({ subMenuItems }: IProps) => {
  return (
    <ul className='text-white flex flex-col gap-2'>
      {subMenuItems.map((submenu, index) => (
        <li
          key={index}
          className='hover:text-light-tan hover:underline hover:underline-offset-8 focus:text-light-tan'>
          <NavLink to={submenu.url}>{submenu.title}</NavLink>
        </li>
      ))}
    </ul>
  )
}

export default Dropdown
