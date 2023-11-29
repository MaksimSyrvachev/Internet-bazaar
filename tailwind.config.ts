import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primaryBackground': '#EBD8D0',
        'colorOnPrimary': '#FFFBFF',
        'hoverPrimary': '#D3AB9E',
        'selectedPrimary': '#debfb7',
        'adBackground': '#f6f1ef',
      },
    },
  },
  plugins: [],
}
export default config
