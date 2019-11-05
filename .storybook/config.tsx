import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { configure, addDecorator } from '@storybook/react'

// automatically import all files ending in *.stories.js
configure(require.context('../components', true, /\.story\.tsx/), module)

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    color: unset;
    transition: color 0.2s;

    &:hover, &:focus {
      outline: none;
      color: #e9e9e9;
      transition: color 0.2s;
    }
  }

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
  width: '100%';
  height: '100%';
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
`

const theme = {}

const LayoutDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />

      <Layout>{storyFn()}</Layout>
    </>
  </ThemeProvider>
)

addDecorator(LayoutDecorator)
