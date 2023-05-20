import { default as plugin } from 'tailwindcss';
import { default as twColors } from 'tailwindcss/colors';

// const colors = {
//   transparent: twColors.transparent,
//   black: twColors.black,
//   white: twColors.white,
// };

/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  extend: {
    colors: {
      mainGradient: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)'
    }
  },
};
export const plugins = [];
