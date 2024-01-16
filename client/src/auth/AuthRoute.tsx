import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';

interface ProtectedRouteProps {
  roles?: string[];
}

const AuthRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
  const { isAuthenticated, userRoles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/konto/logga-in' />;
  }

  if (roles && !roles.some((role: string) => userRoles?.includes(role))) {
    return <Navigate to='/' />;
  }

  return <Outlet />
};

export default AuthRoute;
