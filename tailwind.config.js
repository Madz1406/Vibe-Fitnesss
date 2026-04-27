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
        brand: {
          pink: '#FF2D9B',
          purple: '#7B2FFF',
          cyan: '#00E5FF',
          'pink-glow': 'rgba(255, 45, 155, 0.3)',
          'cyan-glow': 'rgba(0, 229, 255, 0.25)',
          'card-bg': 'rgba(255, 255, 255, 0.04)',
          'card-border': 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF2D9B, #7B2FFF)',
        'gradient-brand-h': 'linear-gradient(90deg, #FF2D9B, #7B2FFF, #00E5FF)',
      },
      boxShadow: {
        'card': '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)',
        'glow-pink': '0 4px 24px rgba(255, 45, 155, 0.4)',
        'glow-cyan': '0 4px 24px rgba(0, 229, 255, 0.3)',
        'btn-hover': '0 8px 32px rgba(255, 45, 155, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'level-up': 'levelUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.4s ease-out',
        'fade-up': 'fadeUp 0.5s ease forwards',
        'bar-fill': 'barFill 1.2s cubic-bezier(0.4,0,0.2,1) forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'blob-drift': 'blobDrift 8s ease-in-out infinite alternate',
        'blob-drift-r': 'blobDrift 10s ease-in-out infinite alternate-reverse',
        'counter': 'fadeUp 0.3s ease forwards',
        'ripple': 'ripple 0.6s ease-out forwards',
        'burst': 'particleBurst 0.6s ease-out forwards',
        'spin-once': 'spinOnce 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      keyframes: {
        levelUp: {
          '0%': { transform: 'scale(0.5) translateY(20px)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(-20px)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(255, 0, 110, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(255, 0, 110, 0.8)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        barFill: {
          from: { width: '0%' },
          to: { width: 'var(--bar-width)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        blobDrift: {
          from: { transform: 'translate(0,0) scale(1)' },
          to: { transform: 'translate(40px,30px) scale(1.08)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        particleBurst: {
          '0%': { transform: 'scale(0) translate(0,0)', opacity: '1' },
          '100%': { transform: 'scale(1) translate(var(--tx),var(--ty))', opacity: '0' },
        },
        spinOnce: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
