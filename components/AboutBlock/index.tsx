import React from 'react'
import styled from 'styled-components'

import { H2 } from '../blocks/Typography/Header'

const Wrapper = styled.div`
  grid-column: 4 / -1;
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 41px;
  grid-template-columns: repeat(9, 1fr);
  margin: 95px 0;
`

const RowHeader = styled(H2)`
  grid-row: 1;
  grid-column: 1 / -1;
  margin: 0;
  line-height: 48px;
`

export const Row = ({ title, children }) => (
  <Wrapper>
    <RowHeader>{title}</RowHeader>
    {children}
  </Wrapper>
)

const ColumnHeader = styled.h3`
  font-family: 'Adieu Light';
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 100;
  margin: 3px 0 21px 0;
  letter-spacing: 0.4px;
`

const ColumnWrapper = styled.div`
  grid-row: 2;
  grid-column: span 3;
  font-family: 'Editorial New Ultralight';
  font-size: 28px;
  line-height: 36px;
  font-weight: 100;
  letter-spacing: 0.5px;
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
