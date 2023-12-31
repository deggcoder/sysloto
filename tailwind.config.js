/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface-container': '#221F1A',
        'on-surface': '#CCC6BD',
        'surface-container-high': '#2C2A24',
        'primary-container': '#574500',
        'primary50': '#917400',
        'tertiary-container': '#2F4D34',
        'primary60': '#AF8D0F',
        'surface': '#15130E',
        'surface-container-low': '#1E1B16',
        'on-surface-variant': '#CFC6B4',
        'outline': '#989080',
        'tertiary': '#ADCFAE',
        'error': '#FFB4AB',
        'secondary': '#D5C5A1',
        'on-tertiary-container': '#C8ECC9',
        'tertiary-fixed': '#C8ECC9',
        'secondary-container': '#50462A',
        'on-secondary-container': '#F1E1BB',
        'primary': '#EAC248',
        'on-primary-fixed-variant': '#574500',
        'primary-fixed': '#FFE089',
        'on-primary-fixed': '#241A00',
        'surface-container-highest': '#37342E',
        'surface-variant': '#4C4639',
        'outline-variant': '#4C4639',
        'on-primary-container': '#FFE089',
        'shadow': '#000',
        'on-primary': '#3D2F00',
        'on-secondary': '#393016',
      },
      fontFamily: {
        display: ['Merriweather Sans', 'sans-serif'],
        content: ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl2': '14px',
        'ty': '4px',
      },
      padding: {
        '6.5': '26px',
        '4.5': '18px',
      },
      width: {
        '90': '360px', 
      },
      fontSize: {
        'label-small': ['11px', { lineHeight: '16px', fontWeight: '500', fontFamily: 'Noto Sans, sans-serif', }],
        'label-medium': ['12px', { lineHeight: '16px', fontWeight: '500', fontFamily: 'Noto Sans, sans-serif', }],
        'label-large': ['14px', { lineHeight: '20px', fontWeight: '500', fontFamily: 'Noto Sans, sans-serif', }],
        'body-small': ['12px', { lineHeight: '16px', fontWeight: '400', fontFamily: 'Noto Sans, sans-serif', }],
        'body-medium': ['14px', { lineHeight: '20px', fontWeight: '400', fontFamily: 'Noto Sans, sans-serif', }],
        'body-large': ['16px', { lineHeight: '24px', fontWeight: '400', fontFamily: 'Noto Sans, sans-serif', }],
        'title-small': ['14px', { lineHeight: '20px', fontWeight: '500', fontFamily: 'Noto Sans, sans-serif', }],
        'title-medium': ['16px', { lineHeight: '24px', fontWeight: '500', fontFamily: 'Noto Sans, sans-serif', }],
        'title-large': ['22px', { lineHeight: '28px', fontWeight: '400', fontFamily: 'Noto Sans, sans-serif', }],
        'headline-small': ['24px', { lineHeight: '32px', fontWeight: '400', fontFamily: 'Noto Sans, sans-serif', }],
        'headline-medium': ['28px', { lineHeight: '36px', fontWeight: '400', fontFamily: 'Merriweather Sans, sans-serif', }],
        'headline-large': ['32px', { lineHeight: '40px', fontWeight: '400', fontFamily: 'Merriweather Sans, sans-serif', }],
        'display-small': ['36px', { lineHeight: '44px', fontWeight: '400', fontFamily: 'Merriweather Sans, sans-serif', }],
      },
      gap: {
        '4.5': '18px',
      }
    },
  },
  plugins: [],
}

