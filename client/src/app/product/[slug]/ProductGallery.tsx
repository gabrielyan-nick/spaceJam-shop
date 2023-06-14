'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface IProductGallery {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: IProductGallery) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryRef = useRef(null);
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (event: any) => {
    startX = event.pageX - galleryRef.current.offsetLeft;
    scrollLeft = galleryRef.current.scrollLeft;
    document.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseMove = (event: any) => {
    const x = event.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };

  return (
    <div className="max-w-[450px]">
      <div className="w-full h-[350px] overflow-hidden rounded-md">
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

      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={galleryRef}
        className="mt-4 pb-1 w-full flex gap-[6px] overflow-x-auto whitespace-nowrap carousel-wrapper"
      >
        {images.map((image, index) => (
          <button
            className="w-[145px] h-[110px]  shrink-0"
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
  );
};

export default ProductGallery;
