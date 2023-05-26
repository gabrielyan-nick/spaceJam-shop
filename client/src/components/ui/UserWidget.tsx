'use client';

import Button from './Button';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import useOnClickOutside from 'hooks/useOnClickOutside';
import React, { useRef, useState } from 'react';

const UserWidget = () => {
  const { user } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { logout } = useActions();
  const popupRef = useRef(null);

  useOnClickOutside(popupRef, () => setIsPopupOpen(false));

  const name =
    user?.name.length! > 7
      ? `${user?.name?.trim().slice(0, 7)}...`
      : user?.name.trim();

  const togglePopup = () => {
    setIsPopupOpen(isPopupOpen => !isPopupOpen);
  };

  return (
    <div className="relative">
      <Button variant="user-widget-btn" onClick={togglePopup}>
        {name}
      </Button>
      {isPopupOpen && (
        <div
          ref={popupRef}
          className="animate-open absolute min-w-[100%] top-[40px] rounded-lg right-0 bg-modalOverlay"
        >
          <ul className="p-1 space-y-1">
            <li>
              <Button variant="popup-btn" onClick={() => logout()}>
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
