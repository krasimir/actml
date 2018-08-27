var presets = [
  '@babel/env',
  '@babel/preset-react'
]

if (process.env['PROCESS'] === 'build') {
  presets = [
    [
      '@babel/env',
        {
          'modules': false
        }
    ],
    '@babel/preset-react'
  ]
}

module.exports = { presets };
