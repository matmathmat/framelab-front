/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'cream': '#FFFDF5',
        'neo-pink': '#FF90E8',
        'neo-green': '#23C55E',
        'custom-pink': 'rgb(250, 112, 215)',
        'electric-yellow': '#fae469',
        'neo-lilac': '#C4A1FF',
        'gold': '#FFD700',
        'silver': '#C0C0C0',
        'bronze': '#CD7F32',
      },
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neo': '6px 6px 0px 0px #121212',
        'neo-hover': '8px 8px 0px 0px #121212',
        'neo-sm': '3px 3px 0px 0px #000',
        'neo-md': '4px 4px 0px 0px #000',
        'neo-lg': '5px 5px 0px 0px #000',
        'neo-xl': '10px 10px 0px 0px #121212',
      },
    },
  },
  plugins: [],
}