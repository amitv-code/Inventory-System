import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }