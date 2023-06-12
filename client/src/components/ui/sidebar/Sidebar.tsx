'use client';

import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';
import { SidebarLink } from 'components';
import Loader from 'components/ui/Loader';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CategoryService from 'services/category.service';
import { ICategory } from 'types/category.interface';

interface ISidebar {
  categories: ICategory[];
}

const Sidebar = ({ categories }: ISidebar) => {
  const pathname = usePathname();

  return (
    <aside className="w-full smm:fixed left-0 bottom-0 smm:h-bodyHeight smm:w-[180px] md:w-[200px] lg:w-[250px] bg-mainDark px-3 py-5">
      <p className="text-textSecondary text-lg mb-3 ml-3">Категорії</p>
      <nav>
        <ul className="flex smm:block">
          <li>
            <Link
              className={cn(
                'w-full py-2 px-4 block rounded-lg text-lg transition-colors',
                {
                  'bg-mainPurple': pathname === `/`,
                },
              )}
              href={`/`}
            >
              Всі
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
