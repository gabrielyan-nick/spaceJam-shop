/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  extend: {
    colors: {
      mainDark: '#1A1A2E',
      bgDark: '#131322',
      bgDarkBtn: '#1a1a2e9c',
      secondaryDark: '#16213E',
      mainPurple: '#7A0BC0',
      purple3: '#610094',
      darkPurple: '#3F0071',
      logoText: '#E94560',
      mainText: '#DBEDF3',
      textSecondary: '#5f9ea0',
      modalOverlay: '#000000e0',
      textHover: '#ba63f3',
      greenBlue: '#00818A',
      popupBg: '#212937',
    },
    boxShadow: {
      card: '0 0 20px 10px #1a1a2eab',
      showMore: '-10px -10px 20px 7px #16213E',
    },
    screens: {
      sxx: '400px',
      sx: '530px',
      600: '600px',
      smm: '700px',
      885: '885px',
      mdd: '1000px',
      xxl: '1350px',
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
