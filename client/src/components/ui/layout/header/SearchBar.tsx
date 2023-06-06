'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const SearchBar = () => {
  const [value, setValue] = useState<string>('');
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    value !== '' && router.push(`/search?q=${value}`);
  };

  return (
    <form className="relative" onSubmit={onSubmit}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type="text"
        placeholder="Пошук..."
        className="w-full pl-2 pr-8 py-1  font-main rounded-xl bg-secondaryDark border-[3px] border-mainPurple focus:border-purple-500 transition-colors outline-none text-white"
      />
      <button
        type="submit"
        className="bg-darkPurple rounded-r-[9px] flex justify-center items-center absolute right-[3px] top-1/2 -translate-y-1/2 h-[32px] w-[25px]"
      >
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.5 17c1.71 0 3.287-.573 4.55-1.537l4.743 4.744a1 1 0 001.414-1.414l-4.744-4.744A7.5 7.5 0 109.5 17zM15 9.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
            className="fill-mainText"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
