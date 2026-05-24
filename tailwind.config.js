export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neonPurple: '#7c3aed',
        neonCyan: '#00e5ff',
        deepNavy: '#0f172a',
        darkSlate: '#111827',
        blueGray: '#1e293b',
        cyberRed: '#f43f5e',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(124, 58, 237, 0.35)',
        'neon-purple': '0 0 15px rgba(124, 58, 237, 0.5)',
        'neon-cyan': '0 0 15px rgba(0, 229, 255, 0.5)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'neon-gradient': 'linear-gradient(90deg, #7c3aed, #00e5ff)',
        'radial-glow': 'radial-gradient(circle at top left, rgba(124,58,237,0.22), transparent 26%), radial-gradient(circle at bottom right, rgba(0,229,255,0.16), transparent 24%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(124,58,237,0.25)' },
          '50%': { boxShadow: '0 0 40px 20px rgba(124,58,237,0.06)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-45deg)' },
          '100%': { transform: 'translateX(300%) skewX(-45deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};
