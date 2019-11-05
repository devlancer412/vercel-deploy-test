import { gql } from 'apollo-boost'

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

export const Services = ({ services }) => {
  const columns = services.columns.map(column => (
    <Block.Column
      title={column.heading}
      key={`services-column-${column.heading}`}
    >
      <Ul>
        {column.items.map(({ item }) => (
          <li key={`service-${item}`}>{item}</li>
        ))}
      </Ul>
    </Block.Column>
  ))

  return <Block.Row title="Services">{columns}</Block.Row>
}
