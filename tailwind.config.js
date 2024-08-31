import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontSize: {
        dynamic_xl: 'clamp(42px,-6.5915492958px + 9.7183098592vw,180px)',
      },
      colors: {
        primary: '#222',
        blurry: 'hsla(0,0%,100%,.1)',
        'border-color': 'rgba(25, 25, 25, .08)',
        'background-color': '#F8F8F8',
      },
      backgroundImage: {
        'gradient-linear':
          'linear-gradient(0deg,rgba(0, 0, 0, 0.5) 0%,rgba(0, 0, 0, 0) 100%)',
        'gradient-linear-2':
          'linear-gradient( 0deg, transparent 0%, hsla(0, 0%, 100%, 0.8) 95%)',
        'gradient-linear-3':
          'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)',
      },
      screens: {
        xs: '450px',
        xxs: '390px',
      },
      keyframes: {
        stream: {
          to: {transform: 'translate(calc(-100% - 16px))'},
        },
      },
      animation: {
        stream: 'stream 30s linear infinite',
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};

// hsla(0,0%,100%,.1)
// font-size: ;
