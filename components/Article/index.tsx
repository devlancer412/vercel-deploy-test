import { gql } from 'apollo-boost'
import styled from 'styled-components'

import { generateGrid } from '../../lib/grid'

import * as ArticlePreview from '../ArticlePreview'

import * as Image from '../blocks/Image'
import * as Content from './Content'

import {
  FeatureImage,
  Heading,
  Category,
  Time,
  H1,
  Attributions,
  Attribution,
  Contributed,
  Person,
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
    contributions {
      contributionType {
        value
      }

      contributedBy {
        name
      }
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

const grid = generateGrid()

export const Wrapper = styled.article`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.display}
  ${grid.columns}
`

export const Article = ({ article, category }) => {
  const {
    heading,
    featureImage,
    subHeading,
    intro,
    content,
    createdAt,
    contributions,
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

        <Attributions>
          {contributions.map(({ contributionType, contributedBy }) => (
            <Attribution
              key={`${contributionType.value}-${contributedBy.name}`}
            >
              <Contributed>{contributionType.value}</Contributed>
              <Person>{contributedBy.name}</Person>
            </Attribution>
          ))}
        </Attributions>
      </Heading>
      <SubHeading>{subHeading}</SubHeading>
      <Intro>{intro}</Intro>
      <Content.Content content={content} />
    </Wrapper>
  )
}
