import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as Block from '../AboutBlock'
import { Ul } from '../blocks/List'

export const fragment = gql`
  fragment Services on AboutServices {
    columns {
      heading
      items {
        item
      }
    }
  }
`

const Li = styled.li`
  margin: 0.8rem 0;
`

export const Services = ({ services }) => {
  const columns = services.columns.map(column => (
    <Block.Column
      title={column.heading}
      key={`services-column-${column.heading}`}
    >
      <Ul>
        {column.items.map(({ item }) => (
          <Li key={`service-${item}`}>{item}</Li>
        ))}
      </Ul>
    </Block.Column>
  ))

  return <Block.Row title="Services">{columns}</Block.Row>
}
