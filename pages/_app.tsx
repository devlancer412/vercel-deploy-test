import App from 'next/app'
import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  // a {
  //   text-decoration: none;
  //   color: unset;
  //   transition: color 0.2s;

  //   &:hover {
  //     color: #e9e9e9;
  //     transition: color 0.2s;
  //   }
  // }

  @font-face {
    font-family: "Editorial New Ultralight";
    src: url("/fonts/EditorialNew-Ultralight.otf") format("opentype");
    font-weight: 200;
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
