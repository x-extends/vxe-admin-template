module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  globals: {
    defineProps: true,
    defineEmits: true,
    defineExpose: true,
    defineModel: true
  },
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'no-debugger': ['error'],
    'vue/no-v-model-argument': 'off'
  }
}
