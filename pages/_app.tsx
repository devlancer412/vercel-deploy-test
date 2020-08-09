import App from 'next/app'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme from '../lib/theme'
import * as animate from '../lib/animate'

import * as Nav from '../components/Nav'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  // This overrides the hidden that body-scroll-lock sets on body
  @media (min-width: ${Nav.breakpoint}px) {
    body {
      overflow: scroll !important;
    }
  }

  html {
    font-size: 62.5%;
  }

  a {
    text-decoration: none;
    color: #000000;
  }
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <>
          <span style={{ fontFamily: 'Adieu Backslant' }}></span>
          <GlobalStyle />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    )
  }
}
