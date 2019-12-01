import React from 'react'
import styled, { css } from 'styled-components'

import { H2 } from '../blocks/Header'
import * as typography from '../blocks/typography'

import * as convert from '../../lib/convert'
import { useDefaultAnimation } from '../../lib/animate'
import * as grid from '../../lib/grid'

const layGrid = (from, to, columns = 3, rowsAfterHeader = 1) => {
  const allRows = rowsAfterHeader + 1

  const wrapperGrid = grid.generateGrid({
    columns: { repeat: [columns, '1fr'] },
    rows: { repeat: [allRows, 'auto'] },
    rowGap: convert.viewportUnits(3.7, { to: 1.5 }).fromRem,
  })

  const nthChild = (r, c) => `
    > *:nth-child(${(r - 1) * columns + c - columns + 1}) {
      ${wrapperGrid.placeInColumns(c, {})}
      ${wrapperGrid.placeInRows(r, {})}
    }
  `

  const matrix = Array(rowsAfterHeader).fill(Array(columns).fill(null))
  const matrixCss = matrix
    .map((cs, r) => cs.map((_, c) => nthChild(r + 2, c + 1)).join('\n'))
    .join('\n')

  return css`
    ${grid.placeInColumns(true)(from, { to })}
    ${wrapperGrid.display}
    ${wrapperGrid.columns}
    ${wrapperGrid.rows}

    ${matrixCss}
  `
}

const widths = [12, 12, 8]

const Wrapper = styled.div`
  margin: ${convert.viewportUnits(9.3, { to: 3 }).fromRem} 0;

  ${layGrid(1, 13, 1, 3)}

  ${({ theme }) => `@media (min-width: 700px)`} {
    ${layGrid(1, 13, 3, 1)}
  }

  ${({ theme }) => `@media (min-width: 900px)`} {
    ${layGrid(4, 13, 3, 1)}
  }
`

const RowHeader = styled(H2)<{ animate: any }>`
  grid-row: 1;
  ${grid.placeInColumns(true)(1, { span: 12 })}

  ${({ theme }) => `@media (min-width: 900px)`} {
    ${grid.placeInColumns(true)(1, { span: 8 })}
  }

  margin-top: 0;
  margin-bottom: ${convert.viewportUnits(0, { to: 1.5 }).fromRem};
  line-height: 1.2; // 4.8rem
  ${({ animate }) => animate}
`

export const Row = ({ title, children, className }) => {
  const [ref, animate] = useDefaultAnimation()

  return (
    <Wrapper className={className}>
      <RowHeader ref={ref} animate={animate}>
        {title}
      </RowHeader>
      {children}
    </Wrapper>
  )
}

const ColumnHeader = styled.h3<{ animate: any }>`
  margin-top: ${convert.viewportUnits(1.5, { to: 0 }).fromRem};
  margin-bottom: ${convert.viewportUnits(3.4, { to: 1 }).fromRem};
  ${typography.columnHeader}
  ${({ animate }) => animate}
`

const ColumnWrapper = styled.div`
  ${typography.intro}
  line-height: 1;
`

type ColumnProps = {
  title?: string
  children: React.ReactNode | React.ReactNode[]
}

export const Column = ({ title, children }: ColumnProps) => {
  const [ref, animate] = useDefaultAnimation()

  const columnHeader = (
    <ColumnHeader ref={ref as any} animate={animate}>
      {title}
    </ColumnHeader>
  )

  return (
    <ColumnWrapper>
      {title && columnHeader}
      {children}
    </ColumnWrapper>
  )
}
