'use client';

import {
  AuthButton,
  AuthForm,
  HeaderCart,
  Logo,
  Modal,
  SearchBar,
} from 'components';
import { useAuth } from 'hooks/useAuth';
import useMediaQuery from 'hooks/useMediaQuery';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  const mediaMatchesFav = useMediaQuery('(min-width: 530px) ');
  const mediaMatchesSearch = useMediaQuery('(min-width: 450px) ');

  const onOpenModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <header className="fixed top-0 w-full h-[64px] z-30 flex items-center justify-between px-4 backdrop-blur-sm bg-[#1a1a2ef5]">
        <div className="flex mr-8">
          <Link href="/">
            <Logo />
          </Link>
          {mediaMatchesSearch && (
            <div className="ml-10 mdd:ml-16 flex items-center">
              <SearchBar />
            </div>
          )}
        </div>
        <div className="flex gap-5 items-center">
          {mediaMatchesFav && (
            <Link
              href={user ? '/favorites' : pathname}
              onClick={() => !user && onOpenModal()}
            >
              <svg
                width={25}
                height={25}
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.5 4.5C27.8 2.3 25.3 1 22.7 1c-2.6 0-5.1 1.3-6.7 3.5C14.4 2.3 11.9 1 9.3 1 6.7 1 4.2 2.3 2.5 4.5c-1.9 2.6-2 6.4-.3 9.3 0 0 0 .1.1.1l12.9 16.6c.2.3.5.4.8.4s.6-.1.8-.4L29.7 14s0-.1.1-.1c1.7-2.9 1.6-6.8-.3-9.4z"
                  className="fill-[#c71b5d] hover:fill-[#e9377b] active:fill-[#a0194d] transition-colors"
                />
              </svg>
            </Link>
          )}

          <HeaderCart />
          <AuthButton />
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <AuthForm onClose={onCloseModal} />
      </Modal>
    </>
  );
};

export default Header;
