const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        aliases: {
          ['@']: path.resolve(__dirname, 'src')
        },
        tsConfigPath: './paths.json'
      }
    }
  ]
};
