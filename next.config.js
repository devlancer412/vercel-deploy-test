const withFonts = require('next-fonts')

module.exports = withFonts({
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  compiler: {
    styledComponents: true,
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    // config.node = {
    //   fs: 'empty',
    // }

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
