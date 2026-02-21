/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-fuchsia': '#FF006E',
        'neon-green': '#39FF14',
        'neon-cyan': '#00D9FF',
        'neon-purple': '#B500FF',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'level-up': 'levelUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        levelUp: {
          '0%': {
            transform: 'scale(0.5) translateY(20px)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1) translateY(-20px)',
            opacity: '0',
          },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(255, 0, 110, 0.5)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(255, 0, 110, 0.8)',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
