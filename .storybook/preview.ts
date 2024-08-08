import type { Preview } from '@storybook/vue3'
import '../assets/css/main.css'

import { fn } from '@storybook/test'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'website',
      values: [
        {
          name: 'website',
          value: '#002245'
        },
        {
          name: 'white',
          value: '#ffffff'
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  actions: {
    handleClick: fn(() => console.log('Button clicked')),
    handleMouseOver: fn(() => console.log('Mouse over element'))
    // Füge hier weitere Aktionen hinzu, die du explizit definieren möchtest
  }
}

export default preview
