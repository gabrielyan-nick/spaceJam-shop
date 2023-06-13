'use client';

import { LogoSvg } from '../svg';
import cn from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ICategory } from 'types/category.interface';

type ISidebarLink = Omit<ICategory, 'id'> & {};

const SidebarLink = ({ name, slug }: ISidebarLink) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        className={cn('sidebar-link', {
          'bg-purple3': pathname === `/category/${slug}`,
        })}
        href={`/category/${slug}`}
      >
        {name}
        <LogoSvg
          width={50}
          className={cn('transition-all duration-300', {
            'translate-x-0': pathname === `/category/${slug}`,
            'translate-x-[70px]': pathname !== `/category/${slug}`,
          })}
        />
      </Link>
    </li>
  );
};

export default SidebarLink;
