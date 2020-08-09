import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

import { generateGrid } from '../../../lib/grid'
import theme from '../../../lib/theme'
import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'
import * as typography from '../../blocks/typography'

import * as ArticlePreview from '../../ArticlePreview'
import * as Image from '../../blocks/Image'

const Wrapper = styled.div<any>`
  ${({ grid }) => grid.parent.placeInColumns(1, { span: 12 })}
  ${({ grid }) => grid.parent.placeInRows(2)}
  grid-auto-flow: row dense;

  ${({ grid }) => grid.small.display}
  ${({ grid }) => grid.small.columns}
  ${({ grid }) => grid.small.rows}

  margin-bottom: 0;

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    ${({ grid }) => grid.tiles.display}
    ${({ grid }) => grid.tiles.columns}
    ${({ grid }) => grid.tiles.rows}
  }
`

const tileSize = {
  three: {
    portrait: {
      columns: 3,
      rows: 1,
      heightRatio: 120,
      orientation: 'portrait',
      Overlay({ caseStudy }) {
        return (
          <TileOverlay>
            <TileTitle>{caseStudy.heading}</TileTitle>
          </TileOverlay>
        )
      },
    },
  },

  six: {
    portrait: {
      columns: 6,
      rows: 2,
      heightRatio: 120,
      orientation: 'portrait',
      Overlay({ caseStudy }) {
        return (
          <TileOverlay>
            <TileTitle>{caseStudy.heading}</TileTitle>
            <TileIntro>{caseStudy.intro}</TileIntro>
          </TileOverlay>
        )
      },
    },

    landscape: {
      columns: 6,
      rows: 1,
      heightRatio: 56.4,
      orientation: 'landscape',
      Overlay({ caseStudy }) {
        return (
          <TileOverlay>
            <TileTitle>{caseStudy.heading}</TileTitle>
            <TileIntro shortened>{caseStudy.intro}</TileIntro>
          </TileOverlay>
        )
      },
    },
  },
}

const pos = (row, column) => ({ row, column })

const layout = {
  2: {
    rows: 2,
    configurations: [
      [
        [tileSize.six.portrait, pos(1, 1)],
        [tileSize.six.portrait, pos(1, 7)],
      ],
    ],
  },

  3: {
    rows: 2,
    configurations: [
      [
        [tileSize.six.portrait, pos(1, 1)],
        [tileSize.six.landscape, pos(1, 7)],
        [tileSize.six.landscape, pos(2, 7)],
      ],
    ],
  },

  4: {
    rows: 3,
    configurations: [
      [
        [tileSize.six.portrait, pos(1, 1)],
        [tileSize.six.landscape, pos(1, 7)],
        [tileSize.six.landscape, pos(3, 1)],
        [tileSize.six.portrait, pos(2, 7)],
      ],
    ],
  },

  5: {
    rows: 3,
    configurations: [
      [
        [tileSize.six.portrait, pos(1, 1)],
        [tileSize.six.portrait, pos(1, 7)],
        [tileSize.three.portrait, pos(3, 1)],
        [tileSize.six.landscape, pos(3, 4)],
        [tileSize.three.portrait, pos(3, 10)],
      ],
    ],
  },

  6: {
    rows: 3,
    configurations: [
      [
        [tileSize.six.portrait, pos(1, 1)],
        [tileSize.six.landscape, pos(1, 7)],
        [tileSize.six.landscape, pos(2, 7)],
        [tileSize.three.portrait, pos(3, 1)],
        [tileSize.six.landscape, pos(3, 4)],
        [tileSize.three.portrait, pos(3, 10)],
      ],
    ],
  },
}

export const usingArticles = caseStudies => {
  const topCaseStudies = caseStudies.slice(0, 6)
  const remaining = caseStudies.slice(6)
  if (topCaseStudies.length < 2) return null
  return { topCaseStudies, remaining }
}

const TileTitle = styled.div`
  ${typography.articleTitle}

  margin-bottom: ${convert.viewportUnits(2.4, { by: 0.625 }).fromRem};
`

const shortenedIntro = `
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`

const TileIntro = styled.div<{ shortened?: boolean }>`
  ${typography.bodyCopy}
  ${typography.textIndent}
  color: #ffffff;
  margin-top: auto;

  ${({ shortened }) => shortened && shortenedIntro}
`

const TileOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000;
  color: #ffffff;
  padding: ${convert.viewportUnits(4, { by: 0.625 }).fromRem};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  ${animate.defaultTransition}
  opacity: 0;
  ${TileTitle}, ${TileIntro} {
    ${animate.defaultTransition}
    transform: translateY(20px);
  }

  &:hover {
    ${animate.defaultTransition}
    opacity: 1;
    ${TileTitle}, ${TileIntro} {
      transform: translateY(0);
    }
  }
`

const TilePreview = styled.a`
  display: flex;
  flex-grow: 1;
`

const TileWrapper = styled.a<any>`
  ${({ grid }) => grid.small.placeInColumns(1, { span: 12 })}
  ${({ grid, order }) => grid.small.placeInRows(order)}

  position: relative;
  display: flex;
  flex-direction: column;

  ${ArticlePreview.Wrapper} { display: flex; }
  ${TilePreview} { display: none; }

  ${({ theme }) => `@media (min-width: ${theme.breakpoint.home}px)`} {
    ${({ position, columns, grid }) =>
      grid.tiles.placeInColumns(position.column, { span: columns })}
    ${({ position, rows, grid }) =>
      grid.tiles.placeInRows(position.row, { span: rows })}

    ${ArticlePreview.Wrapper} { display: none; }
    ${TilePreview} { display: flex; }
  }
`

const Tile = ({ caseStudy, tile, position, grid, order }) => {
  const { columns, rows, heightRatio, orientation, Overlay } = tile
  const previewImage = caseStudy[`${orientation}Image`]
  const { slug, heading, intro } = caseStudy

  const preview = {
    heading,
    intro,
    slug,
    category: { title: 'case-studies' },
    previewImage,
  }

  return (
    <TileWrapper
      grid={grid}
      columns={columns}
      rows={rows}
      position={position}
      heightRatio={heightRatio}
      order={order}
    >
      <NextLink href={`/case-studies/${slug}`} passHref>
        <TilePreview>
          <Image.Image
            image={previewImage}
            objectFit="cover"
            heightPercentage={heightRatio}
            height={'100%'}
            inColumns={columns}
            overrideClip={`flex-grow: 1;`}
          />

          {<tile.Overlay caseStudy={caseStudy} />}
        </TilePreview>
      </NextLink>

      <ArticlePreview.ArticlePreview
        key={`top-case-study-${caseStudy._id}`}
        articlePreview={preview}
        width={4}
        fullIntro
        withoutDetails
      />
    </TileWrapper>
  )
}

export const Section = ({ title, topCaseStudies }) => {
  const [tileLayout, setTileLayout] = React.useState(null)

  React.useEffect(() => {
    const { rows, configurations } = layout[`${topCaseStudies.length}`]
    const randomIndex = Math.floor(Math.random() * configurations.length)
    setTileLayout({ rows, configuration: configurations[randomIndex] })
  }, [])

  if (!tileLayout) return null

  const grid = {
    parent: generateGrid(),
    tiles: generateGrid({
      rows: { repeat: [tileLayout.rows, 'auto'] },
      rowGap: theme.grid.gap,
    }),
    small: generateGrid({
      rows: { repeat: [topCaseStudies.length, 'auto'] },
      rowGap: theme.home.rowGap,
    }),
  }

  const renderCaseStudyPreview = (caseStudy, i) => {
    const [tile, position] = tileLayout.configuration[i]

    return (
      <Tile
        order={i + 1}
        caseStudy={caseStudy}
        tile={tile}
        position={position}
        grid={grid}
      />
    )
  }

  return (
    <Wrapper grid={grid}>{topCaseStudies.map(renderCaseStudyPreview)}</Wrapper>
  )
}
