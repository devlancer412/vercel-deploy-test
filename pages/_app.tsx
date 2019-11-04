import App from 'next/app'
import React from 'react'
import styled, {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from 'styled-components'

const theme: DefaultTheme = {}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  @font-face {
    font-family: "Editorial New Ultralight";
    src: url("/fonts/EditorialNew-Ultralight.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Adieu Bold";
    src: url("/fonts/GTFAdieuTRIAL-Bold.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Adieu Light";
    src: url("/fonts/GTFAdieuTRIAL-Light.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Adieu Backslant";
    src: url("/fonts/GTFAdieuTRIAL-RegularBackslant.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
  }
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 40px;
  padding: 0 50px 0 50px;
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </ThemeProvider>
    )
  }
}
