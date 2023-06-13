'use client';

import Button from '../button/Button';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoutes } from 'providers/auth-provider/AuthProvider';
import React, { useRef, useState } from 'react';

const UserWidget = () => {
  const { user } = useAuth();
  const { logout } = useActions();
  const pathname = usePathname();
  const router = useRouter();
  const { isShow, ref, setIsShow } = useOnClickOutside(false);

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

  return (
    <div className="relative">
      <Button variant="user-widget-btn" onClick={togglePopup}>
        {name}
      </Button>
      {isShow && (
        <div
          ref={ref}
          className="animate-open absolute min-w-[100%] top-[40px] rounded-lg right-0 bg-bgPurple shadow-[#00000056] shadow-md"
        >
          <ul className="p-1 space-y-1">
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
                    stroke="#DBEDF3"
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
  );
};

export default UserWidget;
