const plugin = require('tailwindcss/plugin');
const theme = require('./src/styles/tailwind/theme');
const variants = require('./src/styles/tailwind/variants');

const padding = require('./src/styles/tailwind/components/padding');
const margin = require('./src/styles/tailwind/components/margin');
module.exports = {
  purge: [],
  target: 'relaxed',
  prefix: '',
  important: false,
  separator: ':',
  theme,
  variants,
  corePlugins: {},
  plugins: [],
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents(padding);
      addComponents(margin);
    })
  ]
};
