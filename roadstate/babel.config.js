module.exports = {
  env: {
    test: {
      plugins: [
        'transform-es2015-modules-commonjs',
        'transform-object-rest-spread',
        'syntax-class-properties'
      ]
    }
  }
};
