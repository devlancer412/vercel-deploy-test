const withFonts = require('next-fonts')

module.exports = withFonts({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }

    // // Add support for requiring css files
    // config.module.rules.push({
    //   test: /\.s[ac]ss$/i,
    //   use: ['css-loader', 'sass-loader'],
    // })

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            ref: true,
          },
        },
      ],
    })

    const originalEntry = config.entry

    config.entry = async () => {
      const entries = await originalEntry()

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./polyfills.js')
      ) {
        entries['main.js'].unshift('./polyfills.js')
      }

      return entries
    }

    return config
  },
})
