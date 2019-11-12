import { gql } from 'apollo-boost'
import styled from 'styled-components'

import { H1 } from '../blocks/Header'
import * as Image from '../blocks/Image'

import { Content } from './Content'

export const fragment = gql`
  fragment Article on Article {
    heading
    featureImage {
      path
    }
    textBy {
      name
    }
    photographyBy {
      name
    }
    subHeading
    intro
    content
    createdAt: _enabledAt
  }
`

const FeatureImage = styled.div`
  grid-column: 1 / span 6;
  width: 100%;
  margin-bottom: 58px;
`

const Heading = styled.div`
  grid-column: 7 / span 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 58px;
`

const SubHeading = styled.h2`
  grid-column: 1 / -1;
  font-family: 'Editorial New Ultralight';
  font-size: 40px;
  line-height: 50px;
  letter-spacing: 1px;
  font-weight: 100;
  text-transform: uppercase;
  margin-bottom: 46px;
`

const Intro = styled.div`
  grid-column: 4 / -1;
  font-family: 'Editorial New Ultralight';
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 0.5px;
  white-space: pre-wrap;
  tab-size: 28px;
`

const Details = styled.span`
  font-family: 'Adieu Light';
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.18px;
  text-transform: uppercase;
  margin-right: 40px;
`

const Dl = styled.dl``

const Dt = styled(Details)`
  margin-right: 8px;
  display: inline;
`

const Dd = styled.span`
  font-family: 'Editorial New Ultralight';
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.18px;
  display: inline;
  margin-right: 18px;
  text-transform: uppercase;
`

const Wrapper = styled.article`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 40px;
  grid-template-rows:
    [header] fit-content
    [subheading] fit-content
    [intro] fit-content;
    [content] fit-content;
`

const ArticleH1 = styled(H1)`
  margin: 18px 0;
`

export const Article = ({ article, category }) => {
  const {
    heading,
    featureImage,
    subHeading,
    intro,
    content,
    createdAt,
    textBy,
    photographyBy,
  } = article

  const [createdAtDate] = createdAt.split('T')
  const [year, month, day] = createdAtDate.split('-')

  return (
    <Wrapper>
      <FeatureImage>
        <Image.Image image={featureImage} />
      </FeatureImage>

      <Heading>
        <div>
          <Details>{category}</Details>
          <Details>
            {day}.{month}.{year}
          </Details>
        </div>

        <ArticleH1>{heading}</ArticleH1>

        <Dl>
          <Dt>Text</Dt>
          <Dd>{textBy.name}</Dd>

          <Dt>Photography</Dt>
          <Dd>{photographyBy.name}</Dd>
        </Dl>
      </Heading>
      <SubHeading>{subHeading}</SubHeading>
      <Intro>{intro}</Intro>
      <Content content={content} />
    </Wrapper>
  )
}
