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
        className={cn('w-full', {
          'bg-mainPurple': pathname === `/category/${slug}`,
        })}
        href={`/category/${slug}`}
      >
        {name}
      </Link>
    </li>
  );
};

export default SidebarLink;
