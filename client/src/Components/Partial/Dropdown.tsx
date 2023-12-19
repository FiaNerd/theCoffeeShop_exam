import { NavLink } from 'react-router-dom'

interface SubMenu {
  title: string
  url: string
}

interface IProps {
  subMenuItems: SubMenu[]
  onCloseDropdown: () => void
}

const Dropdown = ({ subMenuItems, onCloseDropdown }: IProps) => {
  return (
    <ul className='font-heading text-2xl tracking-wider font-bold text-white flex flex-col gap-2'>
      {subMenuItems.map((submenu, index) => (
        <li
          key={index}
          className='hover:text-light-tan hover:underline hover:underline-offset-8 focus:text-light-tan'>
          <NavLink to={submenu.url} onClick={onCloseDropdown}>
            {submenu.title}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default Dropdown
