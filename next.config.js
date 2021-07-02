module.exports = {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.mp3/,
        loader: 'file-loader',
        options:{outputPath: 'sounds'}
      })
  
      return config
    },
  }