import React, { FC } from "react";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>header</header>

      {children}

      <footer>footer</footer>
    </div>
  );
};

export default Layout;
