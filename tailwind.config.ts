import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
     colors: {
  'party-teal': '#1B8B8B',        // primary teal for nav
  'party-pink': '#8B6F47',        // brown accent (was pink)
  'party-orange': '#FF9D00',      // orange accent
  'party-cream': '#F5E6C8',       // light beige background
  'party-bg': '#FEFBF7',          // clean off-white
  'party-text': '#1A1A1A',        // dark text
  'party-dark': '#0F0F0F',        // black
  'party-pink-light': '#A0826D',  // light brown (was light pink)
},
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
export default config
