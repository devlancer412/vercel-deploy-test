import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'
import { getImageUrl } from 'takeshape-routing'

import withData from '../lib/apollo'
import { generateGrid } from '../lib/grid'

import * as Nav from '../components/Nav'
import * as Footer from '../components/Footer'
import * as Home from '../components/Home'
import * as Featured from '../components/Home/FeatureGallery'
import * as Contact from '../components/About/Contact'
import * as Loading from '../components/Loading'

const GET_HOME_PAGE = gql`
  ${Home.fragment}
  ${Footer.fragment}
  ${Contact.fragment}

  query GetHomePage(
    $filterArticles: JSON!
    $sortArticles: [TSSearchSort]!
    $size: Int!
  ) {
    getHomePage {
      meta {
        title
        description
        image {
          _id
          path
        }
      }

      ...Home
    }

    getContact {
      ...Contact
    }

    getFooter {
      ...Footer
    }
  }
`

const grid = {
  layout: generateGrid({ rows: { repeat: [1, 'auto'] } }),
  hero: generateGrid({ rows: { exact: 'auto minmax(0, 1fr)' } }),
}

const Layout = styled.main`
  ${grid.layout.display}
  ${grid.layout.columns}
  ${grid.layout.rows}

  padding: 0 ${({ theme }) => theme.grid.padding};

  ${Home.Wrapper} { ${grid.layout.placeInRows(1)} }
`

const Hero = styled.section`
  ${grid.hero.display}
  ${grid.hero.columns}
  ${grid.hero.rows}

  padding: 0 ${({ theme }) => theme.grid.padding};

  ${Nav.Wrapper} { ${grid.hero.placeInRows(1)} }
  ${Featured.Wrapper} { ${grid.hero.placeInRows(2)} }

  @media (orientation: landscape) and (min-height: 640px) {
    height: 100vh;
  }
`

const HomePage = () => {
  const [footerVisible, setFooterVisible] = React.useState(false)

  const { loading, error, data } = useQuery(GET_HOME_PAGE, {
    variables: Home.variables,
  })

  React.useEffect(() => {
    if (window) {
      require('lazysizes')
      // @ts-ignore
      window.lazySizesConfig = window.lazySizesConfig || {}
      // @ts-ignore
      window.lazySizesConfig.expand = 0
    }
  }, [])

  if (loading) return <Loading.Loading />
  if (error || !data) return <div>Error</div>

  const { getHomePage, getContact, getFooter } = data
  const { meta, featured, ...home } = getHomePage

  return (
    <>
      <Head>
        <title>{meta.title}</title>

        <meta itemProp="name" content={meta.title} />
        <meta property="og:title" content={meta.title} />

        <meta property="og:url" content="//veryearly.studio" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />

        {meta.description && (
          <>
            <meta property="og:description" content={meta.description} />
            <meta itemProp="description" content={meta.description} />
            <meta name="twitter:description" content={meta.description} />
          </>
        )}

        {meta.image && (
          <>
            <meta property="og:image" content={getImageUrl(meta.image.path)} />
            <meta itemProp="image" content={meta.image.path} />
            <meta name="twitter:image" content={meta.image.path} />
            {meta.image.description && (
              <meta name="twitter:image:alt" content={meta.image.description} />
            )}
          </>
        )}
      </Head>

      <Hero>
        <Nav.Nav footerVisible={footerVisible} />
        <Featured.FeatureGallery featured={featured} />
      </Hero>

      <Layout>
        <Home.Home home={home} />
      </Layout>

      <Footer.Footer
        contact={getContact}
        footer={getFooter}
        onVisibility={setFooterVisible}
      />
    </>
  )
}

export default withData(HomePage)
