import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @font-face {
                font-family: 'Editorial New Ultralight';
                src:
                  url('/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.otf') format('opentype'),
                  url('/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.eot') format('embedded-opentype'),
                  url('/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.ttf') format('truetype'),
                  url('/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.woff2') format('woff2'),
                  url('/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.woff') format('woff');
                font-weight: 200;
                font-style: normal;
              }

              @font-face {
                font-family: 'Adieu Bold';
                src: url('/fonts/GTF-Adieu-Bold/Adieu-Bold.otf') format('opentype');
                font-weight: normal;
                font-style: normal;
              }

              @font-face {
                font-family: 'Adieu Light';
                src: url('/fonts/GTF-Adieu-Light/Adieu-Light.otf') format('opentype');
                font-weight: normal;
                font-style: normal;
              }

              @font-face {
                font-family: 'Adieu Backslant';
                src: url('/fonts/GTF-Adieu-Light-Backslant/Adieu-LightBackslant.otf') format('opentype');
                font-weight: normal;
                font-style: normal;
              }
            `,
              }}
            ></style>

            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
