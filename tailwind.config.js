/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#173B70',     // Primary deep navy blue
          navyDark: '#0F264A',
          navyLight: '#244E91',
          blue: '#356AE6',     // Professional accent blue
          blueHover: '#2A58C7',
          blueLight: '#EEF3FD',
          blueSubtle: '#F4F7FE',
        },
        surface: {
          bg: '#F7F8FA',       // Soft neutral gray background
          card: '#FFFFFF',     // Pure white cards
          cardHover: '#FAFBFC',
          sidebar: '#FFFFFF',
          border: '#E7EAF0',   // Light gray borders
          borderLight: '#F0F2F6',
          muted: '#F1F3F7',
        },
        ink: {
          primary: '#202938',   // Dark charcoal main text
          secondary: '#707989', // Muted gray secondary text
          light: '#9CA3AF',
          disabled: '#D1D5DB',
        },
        status: {
          successBg: '#ECFDF5',
          successText: '#065F46',
          successBorder: '#A7F3D0',
          warningBg: '#FFFBEB',
          warningText: '#92400E',
          warningBorder: '#FDE68A',
          errorBg: '#FEF2F2',
          errorText: '#991B1B',
          errorBorder: '#FECACA',
          infoBg: '#EFF6FF',
          infoText: '#1E40AF',
          infoBorder: '#BFDBFE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '10px',
        'modal': '12px',
        'badge': '6px',
        'btn': '8px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card': '0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03)',
        'modal': '0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
        'drawer': '-4px 0 24px rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}
