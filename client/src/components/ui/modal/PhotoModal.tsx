'use client';

import { PrevNextArrow } from '../svg';
import { useOnClickOutsideWithoutState } from 'hooks/useOnClickOutside';
import Image from 'next/image';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useSwipeable } from 'react-swipeable';

interface IPhotoModal {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  productName: string;
}

const PhotoModal = ({
  isOpen,
  onClose,
  images,
  productName,
  activeIndex,
  setActiveIndex,
}: IPhotoModal) => {
  const photoRef = useRef(null);
  useOnClickOutsideWithoutState(photoRef, onClose);

  const handlers = useSwipeable({
    onSwipedLeft: () => onGoForward(),
    onSwipedRight: () => onGoBack(),
    swipeDuration: 300,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const onGoBack = () => {
    activeIndex !== 0 && setActiveIndex(activeIndex => activeIndex - 1);
  };

  const onGoForward = () => {
    activeIndex !== images.length - 1 &&
      setActiveIndex(activeIndex => activeIndex + 1);
  };

  return createPortal(
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-modalOverlay animate-overlay">
        <div
          ref={photoRef}
          className="min-w-[43%] max-w-[95%] max-h-[97%] rounded-md bg-secondaryDark animate-modalOpen relative z-[+1]"
        >
          <button
            className="absolute top-1 right-1 p-0.5 rounded-md bg-darkPurple hover:bg-purple-900 active:bg-purple-950 transition-colors duration-200"
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
          <div {...handlers}>
            <Image
              src={images[activeIndex]}
              alt={productName}
              width={450}
              height={350}
              priority
              draggable={false}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="absolute top-1/2 -left-9 -translate-y-1/2"
            disabled={activeIndex === 0}
            onClick={onGoBack}
          >
            <PrevNextArrow size={40} isActive={activeIndex !== 0} />
          </button>
          <button
            className="absolute top-1/2 -right-9 -translate-y-1/2"
            disabled={activeIndex === images.length - 1}
            onClick={onGoForward}
          >
            <PrevNextArrow
              size={40}
              dir="next"
              isActive={activeIndex !== images.length - 1}
            />
          </button>
        </div>
      </div>
    ),

    document.body,
  );
};

export default PhotoModal;
