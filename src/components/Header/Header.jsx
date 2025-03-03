import React from 'react';
import Logo from '../Logo/Logo';
import Tabs from './Tabs/Tabs';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <Tabs />
        </div>
      </div>
    </header>
  );
};

export default Header;
