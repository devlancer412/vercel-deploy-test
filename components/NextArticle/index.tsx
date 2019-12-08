import styled from 'styled-components'

import * as ArticlePreview from '../ArticlePreview'
import * as Header from '../blocks/Typography/Header'

export const Wrapper = styled.section`
  grid-column: 1 / -1;
  border-top: 1px solid #000000;
  padding-top: 56px;
  margin-top: 110px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 40px;
`

const Title = styled(Header.H1)`
  grid-column: 1 / 1;
  margin-top: 0;
`

export const NextArticle = ({ nextArticle }) => {
  return (
    <Wrapper>
      <Title>
        Next
        <br />
        Article
      </Title>

      <ArticlePreview.ArticlePreview
        articlePreview={nextArticle}
        width={4}
        headingWidth={4}
      />
    </Wrapper>
  )
}
