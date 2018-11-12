module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('images')
        .test(/\.svg$/i)
        .use('url-loader')
        .loader('url-loader')
        .tap((options) => Object.assign(options, { limit: 10240 }));
  }
}
