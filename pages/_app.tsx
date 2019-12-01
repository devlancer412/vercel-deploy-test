import App from 'next/app'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme from '../lib/theme'

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
