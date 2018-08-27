import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/dialectica.js',
    format: 'umd',
    name: 'dialectica'
  },
  plugins: [ babel({ runtimeHelpers: true }) ]
};