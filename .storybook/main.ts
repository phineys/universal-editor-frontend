import { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['./stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: '@storybook/vue3-vite',
  core: {
    builder: '@storybook/builder-vite'
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],
      css: {
        postcss: {
          plugins: [require('tailwindcss'), require('autoprefixer')]
        }
      }
    })
  }
}

export default config
