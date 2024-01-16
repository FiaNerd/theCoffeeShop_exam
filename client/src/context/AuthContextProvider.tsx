import { ReactNode, createContext, useContext } from "react";
import { useAppSelector } from "../redux/configureStore";
import { User } from "../types/user";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated?: boolean;
  userRoles?: string[]; 
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
    const { user } = useAppSelector((state) => state.account);

    const authContextValue: AuthContextValue = {
        isAuthenticated: user !== null,
        userRoles: user?.roles || [], 
        user,
    };
  
    return (
      <AuthContext.Provider value={authContextValue}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
