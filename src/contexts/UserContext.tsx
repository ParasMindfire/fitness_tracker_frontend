import { createContext, useContext, useState, ReactNode } from 'react';

interface UserInterface {
  user: any;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserInterface | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};