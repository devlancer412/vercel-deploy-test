import styled from 'styled-components'
import { gql } from 'apollo-boost'

import * as FeatureGallery from './FeatureGallery'
import * as CategorySection from './CategorySections'
import * as ArticlePreview from '../ArticlePreview'

import { generateGrid } from '../../lib/grid'
import * as convert from '../../lib/convert'

const grid = generateGrid({ rows: { repeat: [4, 'auto'] } })

export const variables = {
  ...CategorySection.variables(1),
  filterArticles: { bool: { allowOnHomepage: true } },
}

export const fragment = gql`
  ${ArticlePreview.fragment}
  ${CategorySection.fragment}

  fragment Home on HomePage {
    featured {
      ...ArticlePreview
    }

    categorySections {
      ...CategorySection
    }
  }
`

export const Wrapper = styled.main`
  ${grid.placeInColumns(1, { span: 12 })}
  ${grid.display}
  ${grid.columns}

  margin-bottom: ${convert.viewportUnits(5.3, { by: 0.625 }).fromRem}; // 5.3rem

  ${CategorySection.Wrapper}:last-child {
    border-bottom: 0;
  }
`

export const Home = ({ home }) => {
  const { categorySections } = home

  return (
    <Wrapper>
      {categorySections.map(categorySection => (
        <CategorySection.CategorySection
          key={`category-section-${categorySection.title}`}
          categorySection={categorySection}
        />
      ))}
    </Wrapper>
  )
}
