module.exports = {
  env: {
    test: {
      plugins: [
        'transform-es2015-modules-commonjs',
        'transform-es2015-destructuring',
        'transform-object-rest-spread'
      ]
    }
  }
};
