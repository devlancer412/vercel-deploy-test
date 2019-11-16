import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as ArticlePreview from '../ArticlePreview'

import * as Image from '../blocks/Image'
import * as Content from './Content'

import {
  Wrapper,
  FeatureImage,
  Heading,
  Category,
  Time,
  H1,
  Dl,
  Dt,
  Dd,
  SubHeading,
  Intro,
} from './Article.styles'

export const fragment = gql`
  ${ArticlePreview.fragment}

  fragment Article on Article {
    heading
    featureImage {
      path
    }
    textBy {
      name
    }
    photographyBy {
      name
    }
    subHeading
    intro
    content
    createdAt: _enabledAt
    nextArticle {
      ...ArticlePreview
    }
  }
`

export const Article = ({ article, category }) => {
  const {
    heading,
    featureImage,
    subHeading,
    intro,
    content,
    createdAt,
    textBy,
    photographyBy,
  } = article

  const [createdAtDate] = createdAt.split('T')
  const [year, month, day] = createdAtDate.split('-')

  return (
    <Wrapper>
      <FeatureImage>
        <Image.Image image={featureImage} />
      </FeatureImage>

      <Heading>
        <div>
          <Category>{category}</Category>
          <Time>
            {day}.{month}.{year}
          </Time>
        </div>

        <H1>{heading}</H1>

        <Dl>
          <Dt>Text</Dt>
          <Dd>{textBy.name}</Dd>

          <Dt>Photography</Dt>
          <Dd>{photographyBy.name}</Dd>
        </Dl>
      </Heading>
      <SubHeading>{subHeading}</SubHeading>
      <Intro>{intro}</Intro>
      <Content.Content content={content} />
    </Wrapper>
  )
}
