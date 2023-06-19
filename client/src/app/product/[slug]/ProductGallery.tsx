'use client';

import cn from 'clsx';
import PhotoModal from 'components/ui/modal/PhotoModal';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface IProductGallery {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: IProductGallery) => {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (event: any) => {
    startX = event.pageX - trackRef.current!.offsetLeft;
    scrollLeft = trackRef.current!.scrollLeft;
    document.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseMove = (event: any) => {
    const x = event.pageX - trackRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const onOpenPhoto = () => setIsPhotoOpen(true);
  const onClosePhoto = () => {
    setIsPhotoOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <div className="max-w-[445px]">
        <div className="w-full h-[350px] overflow-hidden rounded-md">
          <Image
            src={images[activeIndex]}
            alt={productName}
            width={450}
            height={350}
            priority
            draggable={false}
            className="w-full h-full object-cover cursor-pointer"
            onClick={onOpenPhoto}
          />
        </div>

        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          ref={trackRef}
          className="mt-3 pb-1 w-full flex gap-[5px] overflow-x-auto whitespace-nowrap carousel-wrapper"
        >
          {images.map((image, index) => (
            <button
              className={cn(
                'w-[145px] h-[110px] transition-all duration-200 hover:shadow-lg shrink-0 rounded-md border-solid border-2 border-ro',
                {
                  'border-[#4c0c74] shadow-lg': index === activeIndex,
                  'border-transparent': index !== activeIndex,
                },
              )}
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={image}
                alt={productName}
                width={145}
                height={110}
                priority
                draggable={false}
                className="w-full h-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>

      <PhotoModal
        isOpen={isPhotoOpen}
        onClose={onClosePhoto}
        images={images}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        productName={productName}
      />
    </>
  );
};

export default ProductGallery;
