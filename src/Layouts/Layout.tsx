import React, { ReactNode } from 'react';
import { ToastContainer } from "react-toastify";


const Layout: React.FC<{children:ReactNode}> = ({ children }) => {
  return (
    <div className="min-h-screen p-0 m-0 box-border">
        <ToastContainer/>
        {children}
    </div>
  );
};

export default Layout;
