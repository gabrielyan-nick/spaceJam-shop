'use client';

import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';
import { SidebarLink } from 'components';
import Loader from 'components/ui/Loader';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CategoryService from 'services/category.service';

const Sidebar = () => {
  const { data, isLoading } = useQuery(
    ['get categories'],
    () => CategoryService.getAll(),
    {
      select: ({ data }) => data,
    },
  );

  return (
    <aside className="w-full sm:w-[180px] md:w-[200px] lg:w-[250px] bg-mainDark px-3 py-5">
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <p className="text-textSecondary text-lg">Категорії</p>
          <nav>
            <ul>
              {data?.map(cat => (
                <SidebarLink name={cat.name} slug={cat.slug} key={cat.id} />
              ))}
            </ul>
          </nav>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
