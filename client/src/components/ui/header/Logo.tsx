'use client';

import { LogoSvg } from '../svg';
import useMediaQuery from 'hooks/useMediaQuery';
import React from 'react';

const Logo = () => {
  const mediaMatches = useMediaQuery('(min-width: 700px) ');

  return (
    <div className="flex items-center">
      <LogoSvg />
      {mediaMatches && (
        <p className="pl-3 text-[#e22684] font-semibold font-logo text-4xl">
          SpaceJam
        </p>
      )}
    </div>
  );
};

export default Logo;
