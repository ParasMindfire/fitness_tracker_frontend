import { createContext, useContext, useState, ReactNode } from 'react';
import { UserInterface } from '../interfaces/UserInterface';

const UserContext = createContext<UserInterface | undefined>(undefined);

// UserProvider component that wraps children components and provides the user context
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context values
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};