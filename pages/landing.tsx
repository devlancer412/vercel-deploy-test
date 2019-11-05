import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import withData from '../lib/apollo'

import { Hero } from '../components/Hero'
import * as AboutLong from '../components/AboutLong'
import * as AboutShort from '../components/AboutShort'
import * as Gallery from '../components/LandingGallery'
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

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 40px;
  grid-template-rows:
    [gallery] fit-content
    [aboutLong] fit-content
    [services] fit-content
    [contact] fit-content
    [footer] fit-content;
`

const Landing = ({ placements }) => {
  const { loading, error, data } = useQuery(GET_LANDING_PAGE)

  if (loading) return <Loading.Loading />
  if (error || !data) return <div>Error</div>

  const { getLanding, getContact, getAbout, getFooter } = data
  const { aboutShort, gallery, aboutLong } = getLanding
  const { services } = getAbout

  return (
    <>
      <Hero>
        <AboutShort.AboutShort details={aboutShort} />
      </Hero>

      <Layout>
        <Gallery.LandingGallery placements={placements} content={gallery} />
        <AboutLong.AboutLong details={aboutLong} />
        <Services.Services services={services} />
        <Contact.Contact contactDetails={getContact} />
        <Footer.Footer contact={getContact} footer={getFooter} />
      </Layout>
    </>
  )
}

export default withData(Landing)
