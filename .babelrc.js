var presets = [
  '@babel/env',
  '@babel/preset-react'
];
var plugins = [];

if (process.env['PROCESS'] === 'build') {
  presets = [
    [
      '@babel/env',
        {
          'modules': false
        }
    ],
    '@babel/preset-react'
  ];
  plugins = [
    '@babel/plugin-transform-runtime'
  ];
}

module.exports = { presets, plugins };
