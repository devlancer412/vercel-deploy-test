import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { getImageUrl } from 'takeshape-routing'

import withData from '../lib/apollo'
import { generateGrid } from '../lib/grid'

import * as AboutLong from '../components/AboutLong'
import * as AboutShort from '../components/AboutShort'

import * as Nav from '../components/Nav'
import * as Footer from '../components/Footer'
import * as Contact from '../components/About/Contact'
import * as Services from '../components/About/Services'
import * as Loading from '../components/Loading'

const GET_ABOUT_PAGE = gql`
  ${AboutLong.fragment}
  ${AboutShort.fragment}
  ${Contact.fragment}
  ${Services.fragment}
  ${Footer.fragment}

  query GetAboutPage {
    getAbout {
      shortIntro {
        ...AboutShort
      }

      longIntro {
        ...AboutLong
      }

      services {
        ...Services
      }
    }

    getContact {
      ...Contact
    }

    getFooter {
      ...Footer
    }
  }
`

const grid = generateGrid({ rows: { repeat: [5, 'auto'] } })

const Layout = styled.main`
  ${grid.display}
  ${grid.columns}
  ${grid.rows}

  padding: 0 ${({ theme }) => theme.grid.padding};

  ${Nav.Wrapper} { ${grid.placeInRows(1, {})} }

  ${AboutShort.Wrapper} {
    ${grid.placeInRows(2, {})}
    margin-top: 18.3rem;
    margin-bottom: 12.6rem;
  }

  ${AboutLong.Wrapper} {
    ${grid.placeInRows(3, {})}
    margin-bottom: 4.3rem;
  }

  ${Services.Wrapper} { ${grid.placeInRows(4, {})} }

  ${Contact.Wrapper} {
    ${grid.placeInRows(5, {})}
    margin-bottom: 25.8rem;
  }
`

const AboutPage = ({ galleryPlacements }) => {
  const [footerVisible, setFooterVisible] = React.useState(false)
  const { loading, error, data } = useQuery(GET_ABOUT_PAGE)

  if (loading) return <Loading.Loading />
  if (error || !data) return <ErrorPage statusCode={400} />

  const { getAbout, getContact, getFooter } = data
  const { shortIntro, longIntro, services, meta = {} } = getAbout

  const pageTitle = 'About | Early'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        <meta itemProp="name" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />

        <meta property="og:url" content="//veryearly.studio/about" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />

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

      <Layout>
        <Nav.Nav footerVisible={footerVisible} active="about" />
        <AboutShort.AboutShort details={shortIntro} />
        <AboutLong.AboutLong details={longIntro} />
        <Services.Services services={services} />
        <Contact.Contact contactDetails={getContact} />
      </Layout>

      <Footer.Footer
        active="about"
        contact={getContact}
        footer={getFooter}
        onVisibility={setFooterVisible}
      />
    </>
  )
}

export default withData(AboutPage)
