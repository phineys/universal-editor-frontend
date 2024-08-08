import HeroStoryComponent from '../../components/HeroStorybook.vue'

export default {
  title: 'Components/HeroComponent',
  component: HeroStoryComponent
}

const Template = (args: any) => ({
  components: { HeroStoryComponent },
  setup() {
    return { args }
  },
  template: '<HeroStoryComponent v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  title: 'Default Title',
  text: 'Default Text'
}
