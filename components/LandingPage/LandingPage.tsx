import React from 'react'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as AboutLong from '../AboutLong/AboutLong'
import * as AboutShort from '../AboutShort/AboutShort'
import * as HeadingGallery from '../HeadingGallery/HeadingGallery'
import { Hero } from '../Hero'
import { Footer } from '../Footer'

export const GET_LANDING_PAGE = gql`
  ${HeadingGallery.fragment}

  ${AboutLong.fragment}

  ${AboutShort.fragment}

  query getLandingPage {
    getLandingPage {
      aboutShort {
        ...AboutShort
      }

      gallery {
        ...HeadingGallery
      }

      aboutLong {
        ...AboutLong
      }
    }
  }
`

export const LandingPage = ({ content }) => (
  <>
    <Hero>
      <AboutShort.AboutShort details={content.aboutShort} />
    </Hero>

    <HeadingGallery.HeadingGallery content={content.gallery} />
    <AboutLong.AboutLong details={content.aboutLong} />
    <Footer />
  </>
)
