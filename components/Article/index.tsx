import gql from 'graphql-tag'
import styled from 'styled-components'

import { generateGrid } from '../../lib/grid'
import * as animate from '../../lib/animate'

import * as ArticlePreview from '../ArticlePreview'

import * as Image from '../blocks/Image'
import * as Content from '../Content'

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
  breakpoint,
} from './Article.styles'

export const fragment = gql`
  ${ArticlePreview.fragment}

  fragment Article on Article {
    heading
    featureImage {
      path
    }
    featureImageAlt
    credit {
      type

      person {
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

const grid = generateGrid({ rows: { repeat: [5, 'auto'] } })

export const Wrapper = styled.article`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.display}
  ${grid.columns}
  ${grid.rows}
  margin-top: 2rem;
  margin-bottom: 24rem;

  ${Content.Wrapper} { ${grid.placeInRows(5)} }

  ${`@media (min-width: ${breakpoint}px)`} {
    margin-top: 0;
  }
`

export const Article = ({ article, category }) => {
  const {
    heading,
    featureImage,
    featureImageAlt,
    subHeading,
    intro,
    content,
    createdAt,
    credit,
  } = article

  const [subHeadingRef, subHeadingAnimation] = animate.useDefaultAnimation()
  const [introRef, introAnimation] = animate.useDefaultAnimation()
  const [detailsRef, detailsAnimation] = animate.useDefaultAnimation()
  const [headingRef, headingAnimation] = animate.useDefaultAnimation()
  const [
    contributionsRef,
    contributionsAnimation,
  ] = animate.useDefaultAnimation()

  const [createdAtDate] = createdAt.split('T')
  const [year, month, day] = createdAtDate.split('-')

  return (
    <Wrapper>
      <Heading>
        <div ref={detailsRef}>
          <Category animation={detailsAnimation}>{category}</Category>
          <Time animation={detailsAnimation}>
            {day}.{month}.{year}
          </Time>
        </div>

        <H1 ref={headingRef} animation={headingAnimation}>
          {heading}
        </H1>

        <Attributions ref={contributionsRef} animation={contributionsAnimation}>
          {credit &&
            credit.map(({ type, person }) => (
              <Attribution key={`${type}-${person.map(p => p.name).join('-')}`}>
                <Contributed>{type}</Contributed>
                <Person>{person.map(p => p.name).join(', ')}</Person>
              </Attribution>
            ))}
        </Attributions>
      </Heading>

      <FeatureImage>
        <Image.Image image={featureImage} imageAlt={featureImageAlt} />
      </FeatureImage>

      <SubHeading ref={subHeadingRef} animation={subHeadingAnimation}>
        {subHeading}
      </SubHeading>
      <Intro ref={introRef} animation={introAnimation}>
        {intro}
      </Intro>
      <Content.Content content={content} />
    </Wrapper>
  )
}
