module.exports = {
  env: {
    test: {
      plugins: [
        'transform-es2015-modules-commonjs',
        'transform-object-rest-spread',
        'transform-es2015-destructuring'
      ]
    }
  }
};
