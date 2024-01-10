import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../redux/configureStore'

const RequiredAuth = () => {
  const { user } = useAppSelector((state) => state.account)
  const location = useLocation()

  if (!user) {
    return <Navigate to='/konto/logga-in' state={{ from: location }} />
  }

  return <Outlet />
}
export default RequiredAuth
