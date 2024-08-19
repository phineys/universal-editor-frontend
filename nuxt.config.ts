import path from 'path'
import fs from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      devAuthor: process.env.DEFAULT_AUTHOR_HOST || 'https://localhost:4502',
      devPublisher: process.env.DEFAULT_PUBLISHER_HOST || 'https://localhost:4502',
      devCredentials:
        process.env.DEFAULT_AUTHOR_CREDENTIALS || 'Basic YWRtaW46YWRtaW4=',
        aemPublicKey: process.env.AEM_PUBLIC_KEY || '',
        aemPrivateKey: process.env.AEM_PRIVATE_KEY || '',
        aemClientId: process.env.AEM_CLIENT_ID || '',
        aemImsEndpoint: process.env.IMS_ENDPOINT || ''
    }
  },

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  app: {
    head: {
      meta: [
        {
          name: 'urn:adobe:aue:system:aemconnection',
          content: `aem:${process.env.DEFAULT_AUTHOR_HOST}`
        },
        {
          name: 'urn:adobe:aue:config:service',
          content: 'https://universal-editor-service.experiencecloud.live'
        }
      ],
      script: [
        {
          src: 'https://universal-editor-service.experiencecloud.live/corslib/LATEST'
        },
        {
          type: 'application/vnd.adobe.aue.model+json',
          src: '/model-definition.json'
        },
        {
          type: 'application/vnd.adobe.aue.component+json',
          src: '/component-definition.json'
        }
      ]
    }
  },

  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')).toString(),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')).toString()
    }
  },

  modules: ['@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/storybook', "@nuxthub/core"],

  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English-US', file: 'en-US.json' },
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de-DE.json' }
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  },

  compatibilityDate: '2024-08-19'
})