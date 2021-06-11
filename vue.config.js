module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `@import "~/src/styles/styles.scss";`
        }
      }
    },
    publicPath: `/abz/`
  }