import React, { ReactNode } from 'react';


const Layout: React.FC<{children:ReactNode}> = ({ children }) => {
  return (
    <div className="min-h-screen p-0 m-0 box-border">
      {children}
    </div>
  );
};

export default Layout;
