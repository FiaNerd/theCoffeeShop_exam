// // AuthContext.js
// import { createContext, useContext, ReactNode, useState } from 'react';
// import { User } from '../types/user';

// interface AuthContextProps {
//   user: User | null;
//   login: (user: User) => void;
//   logout: () => void;
// }

// const AuthContextProvider = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null)
//   const [userEmail, setUserEmail] = useState<string | null>(null)
// 	const [userName, setUserName] = useState<string | null>(null)

//   const login = (email: string, username: string) => {
//     setUser(email, usetName);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContextProvider.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContextProvider.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContextProvider);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
