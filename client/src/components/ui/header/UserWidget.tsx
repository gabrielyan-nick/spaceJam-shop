'use client';

import Button from '../button/Button';
import { AuthForm, Heading, Modal } from 'components';
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
    document.body.classList.remove('overflow-hidden');
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
    togglePopup();
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  const onGoToOrders = () => {
    togglePopup();
    router.push('/my-orders');
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
                <Button variant="popup-btn" onClick={onGoToOrders}>
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 .75H1a1 1 0 00-1 1v.5a1 1 0 001 1h2.012l2.724 11.481A4.25 4.25 0 009.765 18V18h7.822a4 4 0 003.943-3.325l1.256-7.338A2 2 0 0020.814 5H5.997l-.78-3.289A1.25 1.25 0 004 .75zM10 21a2 2 0 11-4 0 2 2 0 014 0zM21 21a2 2 0 11-4 0 2 2 0 014 0z"
                      fill="#5f9ea0"
                    />
                  </svg>
                  Замовлення
                </Button>
              </li>
              <li>
                <Button variant="popup-btn" onClick={onOpenModal}>
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

      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        width={user ? 'sm' : 'md'}
      >
        {!user ? (
          <AuthForm onClose={onCloseModal} />
        ) : (
          <>
            <Heading className="text-center">Вийти з акаунта?</Heading>
            <div className="flex justify-between px-4 mt-5">
              <Button className="px-6" variant="auth-btn" onClick={onLogout}>
                Так
              </Button>
              <Button
                onClick={onCloseModal}
                className="px-7"
                variant="auth-btn"
              >
                Ні
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default UserWidget;
