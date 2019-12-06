import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'
import { getImageUrl } from 'takeshape-routing'

import withData from '../lib/apollo'
import { generateGrid } from '../lib/grid'
import * as randomlyPlace from '../lib/randomlyPlace'

import { Hero } from '../components/Hero'
import * as AboutLong from '../components/AboutLong'
import * as AboutShort from '../components/AboutShort'
import * as Gallery from '../components/Landing/Gallery'
import * as Footer from '../components/Footer'
import * as Contact from '../components/About/Contact'
import * as Services from '../components/About/Services'
import * as Loading from '../components/Loading'

const GET_LANDING_PAGE = gql`
  ${Gallery.fragment}
  ${AboutLong.fragment}
  ${AboutShort.fragment}
  ${Contact.fragment}
  ${Services.fragment}
  ${Footer.fragment}

  query getLanding {
    getLanding {
      meta {
        title
        description
        image {
          _id
          path
        }
      }

      aboutShort {
        ...AboutShort
      }

      gallery {
        ...LandingGallery
      }

      aboutLong {
        ...AboutLong
      }
    }

    getAbout {
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

const grid = generateGrid({ rows: { repeat: [4, 'auto'] } })

const Layout = styled.main`
  ${grid.display}
  ${grid.columns}
  ${grid.rows}

  padding: 0 ${({ theme }) => theme.grid.padding};

  ${Gallery.Wrapper} { ${grid.placeInRows(1, {})} }
  ${AboutLong.Wrapper} { ${grid.placeInRows(2, {})} }
  ${Services.Wrapper} { ${grid.placeInRows(3, {})} }
  ${Contact.Wrapper} { ${grid.placeInRows(4, {})} }
`

const Landing = ({ galleryPlacements }) => {
  const main = React.useRef(null)
  const [hasJumped, setHasJumped] = useState(false)
  const { loading, error, data } = useQuery(GET_LANDING_PAGE)
  const jumpOccurred = () => setHasJumped(true)

  if (loading) return <Loading.Loading />
  if (error || !data) return <div>Error</div>

  const { getLanding, getContact, getAbout, getFooter } = data
  const { aboutShort, gallery, aboutLong, meta } = getLanding
  const { services } = getAbout

  return (
    <>
      <Head>
        <title>{meta.title}</title>

        <meta property="og:title" content={meta.title} />
        {meta.image && (
          <meta property="og:image" content={getImageUrl(meta.image.path)} />
        )}
        {meta.description && (
          <meta property="og:description" content={meta.description} />
        )}
        <meta property="og:url" content="//veryearly.studio" />
      </Head>

      <Hero scrollTo={main} onScroll={jumpOccurred}>
        <AboutShort.AboutShort details={aboutShort} />
      </Hero>

      <Layout ref={main}>
        <Gallery.Gallery
          content={gallery}
          pageJumped={hasJumped}
          placements={galleryPlacements}
        />
        <AboutLong.AboutLong details={aboutLong} />
        <Services.Services services={services} />
        <Contact.Contact contactDetails={getContact} />
      </Layout>

      <Footer.Footer
        onScroll={jumpOccurred}
        contact={getContact}
        footer={getFooter}
      />
    </>
  )
}

Landing.getInitialProps = () => {
  return {
    galleryPlacements: [
      randomlyPlace.get(),
      randomlyPlace.get(),
      randomlyPlace.get(),
      randomlyPlace.get(),
    ],
  }
}

export default withData(Landing)
