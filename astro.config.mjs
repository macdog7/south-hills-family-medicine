import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';


export default defineConfig({
  site: 'https://www.southhillsinternalmedicine.com',
  integrations: [sitemap(), icon()],

  prefetch: {
    prefetchAll: true
  },

  vite: {
    plugins: [tailwindcss()]
  },

  fonts: [{
    provider: fontProviders.google(),
    name: "Lato",
    cssVariable: "--font-lato",
    options: {
      variants: [{
        weight: 'normal',
        style: 'normal'
      },
      {
        weight: 'bold',
        style: 'bold'
      }]
    }
  },
  {
    provider: fontProviders.google(),
    name: "Poppins",
    cssVariable: "--font-poppins",
    options: {
      variants: [{
        weight: 'normal',
        style: 'normal'
      },
      {
        weight: 'bold',
        style: 'bold'
      }]
    }
  }]
});