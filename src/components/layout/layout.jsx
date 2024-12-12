import React from 'react';
import Header from '../../components/header/header';
import Lower_header from '../../components/header/lower_header';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Lower_header />
      {children}
    </div>
  );
}
export default Layout;