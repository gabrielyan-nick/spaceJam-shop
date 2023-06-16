'use client';

import Button from '../button/Button';
import { AuthForm, Modal } from 'components';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import useMediaQuery from 'hooks/useMediaQuery';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoutes } from 'providers/auth-provider/AuthProvider';
import React, { useRef, useState } from 'react';

const UserWidget = () => {
  const { user } = useAuth();
  const { logout } = useActions();
  const pathname = usePathname();
  const router = useRouter();
  const { isShow, ref, setIsShow } = useOnClickOutside(false);
  const mediaMatches = useMediaQuery('(max-width: 529px) ');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const name =
    user?.name.length! > 7
      ? `${user?.name?.trim().slice(0, 7)}...`
      : user?.name.trim();

  const togglePopup = () => {
    setIsShow(isShow => !isShow);
  };

  const onLogout = () => {
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      router.replace('/');
    }
    logout();
  };

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
      <div className="relative">
        <Button variant="user-widget-btn" onClick={togglePopup}>
          {name}
        </Button>
        {isShow && (
          <div
            ref={ref}
            className="animate-open absolute min-w-[100%] top-[40px] rounded-lg right-0 bg-popupBg shadow-[#00000056] shadow-md"
          >
            <ul className="p-1 space-y-1">
              {mediaMatches && (
                <Button variant="popup-btn">
                  <Link
                    className="flex justify-between gap-2 items-center"
                    href={user ? '/favorites' : pathname}
                    onClick={() => !user && onOpenModal()}
                  >
                    <svg
                      width={`17px`}
                      height={`17px`}
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29.5 4.5C27.8 2.3 25.3 1 22.7 1c-2.6 0-5.1 1.3-6.7 3.5C14.4 2.3 11.9 1 9.3 1 6.7 1 4.2 2.3 2.5 4.5c-1.9 2.6-2 6.4-.3 9.3 0 0 0 .1.1.1l12.9 16.6c.2.3.5.4.8.4s.6-.1.8-.4L29.7 14s0-.1.1-.1c1.7-2.9 1.6-6.8-.3-9.4z"
                        fill={'#5f9ea0'}
                      />
                    </svg>
                    Улюблене
                  </Link>
                </Button>
              )}
              <li>
                <Button variant="popup-btn" onClick={onLogout}>
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 7.636V4.5a.5.5 0 00-.5-.5h-9a.5.5 0 00-.5.5v15a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-3.136M10 12h11m0 0l-3-3.5m3 3.5l-3 3.5"
                      stroke="#5f9ea0"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Вийти
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <AuthForm onClose={onCloseModal} />
      </Modal>
    </>
  );
};

export default UserWidget;
