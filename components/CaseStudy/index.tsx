import gql from 'graphql-tag'
import styled from 'styled-components'

import { generateGrid } from '../../lib/grid'
import * as animate from '../../lib/animate'

import * as ArticlePreview from '../ArticlePreview'
import * as Image from '../blocks/Image'
import * as Content from '../Content'

import * as components from './components'

import {
  FeatureImage,
  Heading,
  H1,
  Intro,
  Scopes,
  ScopeListHeader,
  ScopeList,
  Scope,
  breakpoint,
} from './CaseStudy.styles'

export const fragment = gql`
  fragment CaseStudy on CaseStudy {
    heading
    landscapeImage {
      path
    }
    scopes {
      title
      showOnCaseStudyPage
    }
    intro
    content
    createdAt: _enabledAt

    nextCaseStudy {
      heading
      landscapeImage {
        path
      }
      intro
      slug
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

export const CaseStudy = ({ caseStudy }) => {
  const {
    heading,
    landscapeImage,
    scopes,
    intro,
    content,
    createdAt,
  } = caseStudy

  const visibleScopes = scopes.filter(scope => scope.showOnCaseStudyPage)

  const [introRef, introAnimation] = animate.useDefaultAnimation()
  const [headingRef, headingAnimation] = animate.useDefaultAnimation()
  const [scopeRef, scopeAnimation] = animate.useDefaultAnimation()

  const [createdAtDate] = createdAt.split('T')
  const [year, month, day] = createdAtDate.split('-')

  return (
    <Wrapper>
      <FeatureImage>
        <Image.Image
          image={landscapeImage}
          objectFit="cover"
          overrideClip="height: 100%; max-height: auto;"
        />
      </FeatureImage>

      <Heading>
        <Scopes ref={scopeRef} animation={scopeAnimation}>
          <ScopeListHeader>Scope</ScopeListHeader>
          <ScopeList>
            {visibleScopes.map(scope => (
              <Scope>{scope.title}</Scope>
            ))}
          </ScopeList>
        </Scopes>

        <H1 ref={headingRef} animation={headingAnimation}>
          {heading}
        </H1>

        <Intro ref={introRef} animation={introAnimation}>
          {intro}
        </Intro>
      </Heading>

      <Content.Content content={content} config={components.config} />
    </Wrapper>
  )
}
