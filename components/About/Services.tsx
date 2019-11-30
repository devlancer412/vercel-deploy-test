import { gql } from 'apollo-boost'
import styled from 'styled-components'

import * as Block from '../AboutBlock'
import { Ul } from '../blocks/List'

import { useDefaultAnimation } from '../../lib/animate'

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

const Li = styled.li<{ i: number; animate: any }>`
  margin: 0.8rem 0;
  ${({ animate }) => animate}
  transition-delay: 0.${({ i }) => 3 + i}s;
`

export const Services = ({ services }) => {
  const [ref, animate] = useDefaultAnimation()

  const columns = services.columns.map(column => (
    <Block.Column
      title={column.heading}
      key={`services-column-${column.heading}`}
    >
      <Ul ref={ref}>
        {column.items.map(({ item }, i) => (
          <Li key={`service-${item}`} i={i} animate={animate}>
            {item}
          </Li>
        ))}
      </Ul>
    </Block.Column>
  ))

  return <Block.Row title="Services">{columns}</Block.Row>
}
