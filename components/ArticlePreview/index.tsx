import { gql } from 'apollo-boost'
import styled from 'styled-components'
import Link from 'next/link'

import {
  Wrapper,
  FeatureImage,
  Category,
  Time,
  Heading,
  Intro,
  Details,
} from './ArticlePreview.styles'

import * as Image from '../blocks/Image'

export const fragment = gql`
  fragment ArticlePreview on Article {
    heading
    previewImage {
      path
    }
    intro
    createdAt: _enabledAt
    category {
      title
    }
    slug
  }
`

const aspectRatio = {
  7: '153:86',
  6: '130:73',
  4: '105:59',
}

export const ArticlePreview = ({ articlePreview, width }) => {
  const {
    heading,
    previewImage,
    intro,
    createdAt,
    category,
    slug,
  } = articlePreview

  const [createdAtDate] = createdAt.split('T')
  const [yearLong, month, day] = createdAtDate.split('-')
  const yearShort = yearLong.slice(2)

  return (
    <Link href={`/${category.title}/${slug}`}>
      <a>
        <Wrapper>
          <FeatureImage>
            <Image.Image
              image={previewImage}
              imgix={{ ar: aspectRatio[width], fit: 'crop' }}
            />
          </FeatureImage>

          <Details>
            <span>{category.title}</span>
            <time>28.09.19</time>
          </Details>

          <Heading>{heading}</Heading>
          <Intro>{intro}</Intro>
        </Wrapper>
      </a>
    </Link>
  )
}
