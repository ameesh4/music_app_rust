/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      backgroundImage:{
        "custom-image": "url('./src/assets/bg.jpg')",
        "custom-image-2": "url('./src/assets/bg-2.jpg')"
      },
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

