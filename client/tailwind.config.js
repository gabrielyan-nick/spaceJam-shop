import { default as plugin } from 'tailwindcss';
import { default as twColors } from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  extend: {
    colors: {
      mainDark: '#1A1A2E',
      secondaryDark: '#16213E',
      mainPurple: '#7A0BC0',
      purple3: '#610094',
      darkPurple: '#3F0071',
      logoText: '#E94560',
      mainText: '#DBEDF3',
      modalOverlay: '#00000080',
      modalBg: '#16213E',
    },
    width: { catalogWidth: 'calc(100% - 250px)' },
    height: { bodyHeight: 'calc(100vh - 64px)' },
    fontFamily: {
      logo: ['Rampart One', 'cursive'],
      main: ['Rubik', 'sans-serif'],
      secondary: ['Ysabeau', 'sans-serif'],
    },
    keyframes: {
      open: {
        '0%': {
          opacity: 0,
          transform: 'scale(0.95)',
        },
        '100%': {
          opacity: 1,
          transform: 'scale(1)',
        },
      },
      open2: {
        '0%': {
          opacity: 0,
          transform: 'scale(0.95)',
        },
        '100%': {
          opacity: 1,
          transform: 'scale(1)',
        },
      },
      fadeIn: {
        '0%': {
          opacity: 0,
        },
        '100%': {
          opacity: 1,
        },
      },
    },
    animation: {
      modalOpen: 'open .3s ease',
      open: 'open2 .2s ease',
      overlay: 'fadeIn .3s ease',
    },
  },
};
export const plugins = [];
