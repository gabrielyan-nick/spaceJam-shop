'use client';

import { LogoSvg } from '../svg';
import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';
import { SidebarLink } from 'components';
import Loader from 'components/ui/Loader';
import useMediaQuery from 'hooks/useMediaQuery';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CategoryService from 'services/category.service';
import { ICategory } from 'types/category.interface';

interface ISidebar {
  categories: ICategory[];
}

const Sidebar = ({ categories }: ISidebar) => {
  const pathname = usePathname();
  const mediaMatches = useMediaQuery('(min-width: 700px)');

  return (
    <aside className="w-full smm:fixed left-0 bottom-0 smm:h-bodyHeight smm:w-[210px]  xl:w-[300px] bg-mainDark pt-[84px] px-2 pb-2 smm:py-5">
      {mediaMatches && (
        <p className="text-textSecondary text-lg mb-3 ml-3">Категорії</p>
      )}
      <nav>
        <ul className="sxx:grid grid-cols-2 sx:grid-cols-3 smm:block">
          <li>
            <Link
              className={cn('sidebar-link', {
                'bg-purple3': pathname === `/`,
              })}
              href={`/`}
            >
              Всі
              <LogoSvg
                width={50}
                className={cn('transition-all duration-300', {
                  'translate-x-0': pathname === `/`,
                  'translate-x-[70px]': pathname !== `/`,
                })}
              />
            </Link>
          </li>
          {categories?.map(cat => (
            <SidebarLink name={cat.name} slug={cat.slug} key={cat.id} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
