/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1A1F3D',
          main: '#2D3250',
          light: '#3D4570',
        },
        secondary: {
          dark: '#5A6BE6',
          main: '#7C8FFF',
          light: '#9EADFF',
        },
        accent: {
          dark: '#E65151',
          main: '#FF6B6B',
          light: '#FF8585',
        },
        success: {
          dark: '#27AE60',
          main: '#2ECC71',
          light: '#A8E6CF',
        },
        warning: {
          dark: '#D4AC0D',
          main: '#F1C40F',
          light: '#FCE7A9',
        },
        error: {
          dark: '#C0392B',
          main: '#E74C3C',
          light: '#F9EBEA',
        },
        neutral: {
          white: '#FFFFFF',
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
