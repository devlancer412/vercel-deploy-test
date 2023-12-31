'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Head from 'next/head'
import { getImageUrl } from 'takeshape-routing'
import ErrorPage from 'next/error'

import { generateGrid } from '../lib/grid'
import * as takeshape from '../lib/takeshape'

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
  ${Nav.fragment}

  query GetHomePage(
    $articleFilter: JSONObject!
    $articleSort: [TSSearchSortInput]!
    $caseStudyFilter: JSONObject!
    $caseStudySort: [TSSearchSortInput]!
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

    getNavigation {
      ...Navigation
    }
  }
`

const grid = {
  layout: generateGrid({ rows: { repeat: [3, 'auto'] } }),
  fill: generateGrid({ rows: { exact: 'auto 100vh auto' } }),
}

const Layout = styled.main`
  ${grid.layout.display}
  ${grid.layout.columns}
  ${grid.layout.rows}

  padding: 0 ${props => props.theme && props.theme.grid.padding};

  ${Nav.Wrapper} { ${grid.layout.placeInRows(1)} }
  ${Featured.Wrapper} { ${grid.layout.placeInRows(2)} }
  ${Home.Wrapper} { ${grid.layout.placeInRows(3)} }

  @media (orientation: landscape) and (min-height: 540px) {
    ${grid.fill.rows}
  }
`

const HomePage = ({ data, error }) => {
  if (error || !data) return <ErrorPage statusCode={400} title={error} />

  const [footerVisible, setFooterVisible] = React.useState(false)

  React.useEffect(() => {
    if (window) {
      require('lazysizes')
      // @ts-ignore
      window.lazySizesConfig = window.lazySizesConfig || {}
      // @ts-ignore
      window.lazySizesConfig.expand = 0
    }
  }, [])

  const { getHomePage, getContact, getFooter, getNavigation } = data
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
            <meta name="description" content={meta.description} />
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

      <Layout>
        <Nav.Nav navigation={getNavigation} footerVisible={footerVisible} />
        <Featured.FeatureGallery featured={featured} />
        <Home.Home home={home} />
      </Layout>

      <Footer.Footer
        contact={getContact}
        footer={getFooter}
        navigation={getNavigation}
        onVisibility={setFooterVisible}
      />
    </>
  )
}

export async function getServerSideProps() {
  const filterEnabled = process.env.PREVIEWS
    ? { match_all: {} }
    : { term: { _enabled: true } }

  try {
    const data = await takeshape.request(GET_HOME_PAGE, {
      articleFilter: filterEnabled,
      caseStudyFilter: filterEnabled,
      ...Home.variables,
    })
    return { props: { data } }
  } catch (e) {
    return { props: { error: 'Error fetching page contents' } }
  }
}

export default HomePage
