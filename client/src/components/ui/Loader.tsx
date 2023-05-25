import React from 'react';

const Loader = () => {
  return (
    <div className="w-[28px] h-[28px] text-center rounded-full blur-[1px] bg-gradient-to-t from-cyan-500 to-indigo-950 animate-spin animate-overlay">
      <div className="bg-mainPurple w-full h-full rounded-full blur-md"></div>
    </div>
  );
};

export default Loader;
