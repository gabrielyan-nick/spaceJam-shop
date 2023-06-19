import Logo from './header/Logo';
import { LogoSvg } from './svg';
import React from 'react';

const Footer = () => {
  return (
    <footer className=" w-full bg-mainDark h-[50px] flex justify-center shrink-0 items-center">
      <div className="flex  justify-center items-center">
        <LogoSvg width={40} />
        <span className="pl-3 text-[#e22684] font-semibold font-logo text-2xl">
          SpaceJam
        </span>
        <span className="ml-3 translate-y-1 text-textSecondary">2023 ©</span>
      </div>
    </footer>
  );
};

export default Footer;
