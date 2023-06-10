import { Header, Sidebar } from 'components';
import React, { ReactNode } from 'react';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <div className="smm:flex">
        <Sidebar />
        <main className="sm:grow smm:h-bodyHeight overflow-y-scroll bg-secondaryDark py-10 sx:px-3 2xl:px-6">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
