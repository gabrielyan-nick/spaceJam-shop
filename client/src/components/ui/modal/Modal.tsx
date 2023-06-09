'use client';

import './styles.scss';
import cn from 'clsx';
import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface IModal {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  width?: 'sm' | 'md';
}

const Modal = ({ isOpen, onClose, children, width = 'md' }: IModal) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
      document.body.classList.remove('overflow-hidden');
    }
  };

  return createPortal(
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-modalOverlay animate-overlay">
        <div
          className={cn(
            ' max-w-[95%]  rounded-lg bg-secondaryDark animate-modalOpen overflow-hidden relative z-[+1]',
            { 'w-[400px]': width === 'md', 'w-[300px]': width === 'sm' },
          )}
        >
          <div className="flex justify-end p-1">
            <button
              className="p-0.5 rounded-md bg-darkPurple hover:bg-purple-900 active:bg-purple-950 transition-colors duration-200"
              onClick={onClose}
            >
              <svg
                width={25}
                height={25}
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M195.2 195.2a64 64 0 0190.496 0L512 421.504 738.304 195.2a64 64 0 0190.496 90.496L602.496 512 828.8 738.304a64 64 0 01-90.496 90.496L512 602.496 285.696 828.8a64 64 0 01-90.496-90.496L421.504 512 195.2 285.696a64 64 0 010-90.496z"
                  className="fill-[#85CFCB]"
                />
              </svg>
            </button>
          </div>

          <div className="bg-stars">
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
          </div>
          <div className="pt-3 pb-5"> {children}</div>
        </div>
      </div>
    ),

    document.body,
  );
};

export default Modal;
