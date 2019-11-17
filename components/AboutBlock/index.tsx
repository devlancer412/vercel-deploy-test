import React from 'react'
import styled, { css } from 'styled-components'

import { H2 } from '../blocks/Header'

import * as convert from '../../lib/convert'
import * as typography from '../blocks/typography'

const columns = (span, childrenSpan = 3) => css`
  grid-column: ${13 - span} / -1;
  grid-template-columns: repeat(${childrenSpan}, 1fr);
`

const Wrapper = styled.div`
  grid-column: 4 / -1;
  display: grid;
  grid-column-gap: ${({ theme }) => theme.grid.gap};
  grid-row-gap: ${convert.viewportUnits(3.7, { to: 1.5 }).fromRem};
  margin: ${convert.viewportUnits(9.3, { to: 3 }).fromRem} 0;

  ${columns(12, 1)}

  ${({ theme }) => `@media (min-width: 700px)`} {
    ${columns(12)}
  }
  ${({ theme }) => `@media (min-width: 900px)`} {
    ${columns(9)}
  }
`

const RowHeader = styled(H2)`
  grid-row: 1;
  grid-column: 1 / -1;
  margin-top: 0;
  margin-bottom: ${convert.viewportUnits(0, { to: 1.5 }).fromRem};
  line-height: 1.2; // 4.8rem
`

export const Row = ({ title, children }) => (
  <Wrapper>
    <RowHeader>{title}</RowHeader>
    {children}
  </Wrapper>
)

const ColumnHeader = styled.h3`
  margin-top: ${convert.viewportUnits(1.5, { to: 0 }).fromRem};
  margin-bottom: ${convert.viewportUnits(3.4, { to: 1 }).fromRem};
  ${typography.columnHeader}
`

const ColumnWrapper = styled.div`
  ${typography.intro}
  line-height: 1;
`

type ColumnProps = {
  title?: string
  children: React.ReactNode | React.ReactNode[]
}

export const Column = ({ title, children }: ColumnProps) => (
  <ColumnWrapper>
    {title && <ColumnHeader>{title}</ColumnHeader>}
    {children}
  </ColumnWrapper>
)
