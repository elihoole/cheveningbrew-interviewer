import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-4 mb-2">
      <div 
        className="w-10 h-10 bg-cover flex-none" 
        style={{ backgroundImage: `url(${logo})` }}
      />
      <h1 className="text-3xl font-bold bg-gradient-to-br from-[#dd0c7e] via-[#ca1582] to-[#a6208e] text-transparent bg-clip-text">
        CheveningBrew
      </h1>
    </Link>
  );
};

export default Logo;
