module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `@import "~/src/styles/styles.scss";`
        }
      }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/abz/'
    : '/'
  }