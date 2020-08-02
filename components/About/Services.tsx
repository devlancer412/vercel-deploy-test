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
  transition-delay: ${({ i }) => (3 + i) / 10}s;
`

type ServicesProps = {
  services: any
  className?: any
}

export const Wrapper = styled(Block.Row)``

const ServicesColumn = ({ heading, items }) => {
  const [ref, animate] = useDefaultAnimation()

  return (
    <Block.Column title={heading} key={`services-column-${heading}`}>
      <Ul ref={ref}>
        {items.map(({ item }, i) => (
          <Li key={`service-${item}`} i={i} animate={animate}>
            {item}
          </Li>
        ))}
      </Ul>
    </Block.Column>
  )
}

export const Services = ({ services, className }: ServicesProps) => {
  const columns = services.columns.map(ServicesColumn)
  return (
    <Wrapper title="Services" className={className}>
      {columns}
    </Wrapper>
  )
}
