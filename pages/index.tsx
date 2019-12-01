import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'

import withData from '../lib/apollo'
import { generateGrid } from '../lib/grid'

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

const Landing = () => {
  const main = React.useRef(null)
  const [downButtonClicked, setDownButtonClicked] = useState(false)
  const { loading, error, data } = useQuery(GET_LANDING_PAGE)

  if (loading) return <Loading.Loading />
  if (error || !data) return <div>Error</div>

  const { getLanding, getContact, getAbout, getFooter } = data
  const { aboutShort, gallery, aboutLong } = getLanding
  const { services } = getAbout

  return (
    <>
      <Head>
        <title>Early</title>
      </Head>

      <Hero scrollTo={main} onScroll={setDownButtonClicked}>
        <AboutShort.AboutShort details={aboutShort} />
      </Hero>

      <Layout ref={main}>
        <Gallery.Gallery
          content={gallery}
          downButtonClicked={downButtonClicked}
        />
        <AboutLong.AboutLong details={aboutLong} />
        <Services.Services services={services} />
        <Contact.Contact contactDetails={getContact} />
      </Layout>

      <Footer.Footer contact={getContact} footer={getFooter} />
    </>
  )
}

export default withData(Landing)
