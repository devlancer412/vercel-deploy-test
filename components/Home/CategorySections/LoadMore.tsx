import styled, { css } from 'styled-components'

import * as convert from '../../../lib/convert'
import * as animate from '../../../lib/animate'
import { generateGrid } from '../../../lib/grid'

const grid = generateGrid()

const loadMoreCss = css<{ animation?: string }>`
  font-family: 'Adieu Light';
  font-size: ${convert.viewportUnits(2, { by: 0.625 }).fromRem}; // 2rem
  letter-spacing: ${
    convert.viewportUnits(-0.05, { by: 0.625 }).fromRem
  }; // -0.05rem
  text-transform: uppercase;
  font-weight: 100;
  text-align: center;
  ${grid.placeInRows(4)}
  ${grid.placeInColumns(4, { span: 6 })}
  margin-top: ${convert.viewportUnits(11.9, { by: 0.625 }).fromRem}; // 11.9rem
  border: 0;
  padding: 0;
  background-color: transparent;
  color: #000000;

  &:hover {
    font-family: 'Adieu Backslant';
  }

  ${({ theme }) => `@media (min-width: 1015px)`} {
    ${grid.placeInColumns(6, { span: 2 })}
  }
`

const LoadMoreButton = styled.button<{ animation?: string }>`
  ${loadMoreCss}
  ${({ animation }) => animation}
`

const LoadingText = styled.span`
  ${loadMoreCss}
`

export const LoadMore = ({ loading, fetchRows }) => {
  const [loadMoreRef, loadMoreAnimation] = animate.useDefaultAnimation()

  if (loading) return <LoadingText>...</LoadingText>

  return (
    <LoadMoreButton
      ref={loadMoreRef}
      animation={loadMoreAnimation}
      onClick={fetchRows}
    >
      Load More
    </LoadMoreButton>
  )
}
