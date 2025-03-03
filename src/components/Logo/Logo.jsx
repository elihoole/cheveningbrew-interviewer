import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="flex-none items-center gap-20">
      <div className="flex items-center gap-2 w-[190px]">
        <div 
          className="w-[30px] h-[30px] bg-cover flex-none" 
          style={{ backgroundImage: `url(${logo})` }}
        />
        <div className="w-auto text-[24px] leading-[28px] py-5 font-semibold dark:text-pl_txt_dark_1 bg-gradient-to-br from-[#dd0c7e] via-[#ca1582] to-[#a6208e] text-transparent bg-clip-text">
          CheveningBrew
        </div>
      </div>
    </Link>
  );
};

export default Logo;
