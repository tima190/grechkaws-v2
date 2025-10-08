// https://nuxt.com/docs/api/configuration/nuxt-config
import type { MarkdownPlugin } from '@nuxt/content' // если экспортируетсяc

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  hooks: {
    'builder:watch': (event, path) => {
      if (path.endsWith('.md')) {
        // Логика для перезапуска сервера
        // Например, можно вызвать хук 'restart'
        // Однако, прямой вызов 'restart' может быть недоступен в этом контексте
        // Альтернативно, можно использовать другие методы для перезапуска
      }
    }
  },
  
  modules: ['@nuxt/content', '@nuxt/image', '@pinia/nuxt'],
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  css: ['~/assets/css/main.css'],
  content:{
    watch: {
      enabled: true,
      port: 3000,
      showURL: true,
    },
    build:{
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          theme: {
            // Default theme (same as single string)
            default: 'gruvbox-dark-hard',
            // github-dark, github-light, monokai
          },
          langs: [
            'c',
            'cpp',
            'java',
            'python',
            'rust',
            'rs',
            'js',
            'go',
            'sql'
          ]
        },
        remarkPlugins: {
        }},
        
      }
    }
    // Options
  })