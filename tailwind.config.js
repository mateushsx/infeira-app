/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1CA37C',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#FF8A00',
          foreground: '#ffffff',
        },
        background: '#F5FDFA',
        foreground: '#1A1A1A',
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        border: '#E5E5E5',
        input: '#E5E5E5',
        ring: '#1CA37C',
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F3F4F6',
          foreground: '#6B7280',
        },
        accent: {
          DEFAULT: '#F3F4F6',
          foreground: '#1A1A1A',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      fontSize: {
        base: '18px',
        lg: '20px',
        xl: '24px',
        '2xl': '28px',
        '3xl': '32px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};
