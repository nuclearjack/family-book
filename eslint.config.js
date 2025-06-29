import withNuxt from './.nuxt/eslint.config.mjs'
import pluginVue from 'eslint-plugin-vue'
import standard from '@vue/eslint-config-standard'

export default withNuxt(
  ...pluginVue.configs['flat/essential'],
  ...standard,
  {
    files: ['src/pages/**/*.vue', 'src/app/layouts/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
)
