module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'postcss-prefixer': {
        prefix: 'lk-',
        ignore: [/\[class\*="lk-"\]/],
      },
      'postcss-variables-prefixer': {
        prefix: 'lk-',
      },
    },
  };
  