import styled from 'styled-components'
import Link from 'next/link'

import { generateGrid } from '../../../lib/grid'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'

import * as ArticlePreview from '../../ArticlePreview'

const grid = {
  small: generateGrid({ rows: { repeat: [2, 'auto'] } }),
  wide: generateGrid(),
  parent: generateGrid(),
}

const Wrapper = styled.a`
  ${grid.parent.placeInColumns(1, { span: 12 })}
  ${grid.parent.placeInRows(2)}

  ${grid.small.display}
  ${grid.small.columns}
  ${grid.small.rows}

  ${ArticlePreview.Heading} {
    ${animate.defaultTransition}
  }

  &:hover {
    ${ArticlePreview.Heading} {
      ${animate.defaultTransition}
      color: #e9e9e9;
    }
  }

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    ${grid.wide.display}
    ${grid.wide.columns}
    ${grid.wide.rows}
  }

  margin-top: 1rem;
`

const TopArticleImage = styled.div`
  ${grid.small.placeInColumns(1, { span: 12 })}
  ${grid.small.placeInRows(1)}
  margin-bottom: ${convert.viewportUnits(1.2, { by: 0.625 }).fromRem}; // 1.2rem

  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    margin-bottom: 0;
  // For when the article body preview is taller than the image on ~700w screens
    height: 100%;
    ${grid.wide.placeInColumns(1, { span: 7 })}
    ${grid.wide.placeInRows(1)}
  }
`

const TopArticleBody = styled.div`
  ${grid.small.placeInColumns(1, { span: 12 })}
  ${grid.small.placeInRows(2)}

  ${ArticlePreview.Intro} {
    margin-bottom: 0;
  }

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    ${grid.wide.placeInColumns(8, { span: 5 })}
    ${grid.wide.placeInRows(1)}

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

export const includeRemainingIntros = true

export const usingArticles = articles => {
  const [first, ...remaining] = articles
  if (!first) return null
  return { first, remaining }
}

export const Section = ({ title, first }) => {
  return (
    <Link href={`/${first.category.title}/${first.slug}`} passHref>
      <Wrapper>
        <TopArticleImage>
          <ArticlePreview.Splash
            previewImage={first.previewImage}
            previewImageAlt={first.previewImageAlt}
            previewImageFocalPoint={first.previewImageFocalPoint}
            width={7}
          />
        </TopArticleImage>

        <TopArticleBody>
          <ArticlePreview.Body articlePreview={first} fullIntro />
        </TopArticleBody>
      </Wrapper>
    </Link>
  )
}
