import React from 'react';
import Logo from '../Logo/Logo';
import Tabs from './Tabs/Tabs';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="container mx-auto flex flex-col items-center py-6">
        <Logo />
        <div className="mt-6 w-full max-w-2xl">
          <Tabs />
        </div>
      </nav>
    </header>
  );
};

export default Header;
