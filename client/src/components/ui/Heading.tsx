import cn from 'clsx';
import React, { ReactNode } from 'react';

interface IHeading {
  className?: string;
  children: ReactNode;
}

const Heading = ({ children, className = '' }: IHeading) => {
  return (
    <h1 className={cn(`text-cyan-100 text-2xl ${className}`)}>{children}</h1>
  );
};

export default Heading;
