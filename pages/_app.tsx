import App from 'next/app'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import * as convert from '../lib/convert'
import '../polyfills.js'

const theme = {
  breakpoint: {
    wide: 900,
  },
  grid: {
    gap: convert.viewportUnits(40, { to: 16 }).fromPx,
    padding: convert.viewportUnits(50, { to: 18 }).fromPx,
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%;
  }

  a {
    text-decoration: none;
    color: unset;
    transition: color 0.2s;

    &:hover {
      color: #e9e9e9;
      transition: color 0.2s;
    }
  }

  @font-face {
    font-family: "Editorial New Ultralight";
    src:
      url("/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.otf") format("opentype"),
      url("/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.eot") format("embedded-opentype"),
      url("/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.ttf") format("truetype"),
      url("/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.woff2") format("woff2"),
      url("/fonts/EditorialNew-Ultralight/EditorialNew-Ultralight.woff") format("woff");
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: "Adieu Bold";
    src: url("/fonts/GTF-Adieu-Bold/Adieu-Bold.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Adieu Light";
    src: url("/fonts/GTF-Adieu-Light/Adieu-Light.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Adieu Backslant";
    src: url("/fonts/GTF-Adieu-Backslant/Adieu-Backslant.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
  }
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    )
  }
}
