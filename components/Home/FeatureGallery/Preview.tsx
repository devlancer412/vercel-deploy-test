import styled from 'styled-components'
import Link from 'next/link'

import * as ArticlePreview from '../../ArticlePreview'

const Stabilise = styled.div`
  flex-basis: 100%;
  flex-shrink: 0;
`

export const Body = ({ article, i }) => {
  return (
    <Stabilise>
      <ArticlePreview.ArticlePreview
        articlePreview={article}
        width={12}
        withoutIntro
        withoutHeading
      />
    </Stabilise>
  )
}

export const Heading = ({ article, i, animation }) => {
  return (
    <Link href={`/${article.category.title}/${article.slug}`} passHref>
      <Stabilise as="a">
        <ArticlePreview.Heading animation={animation} width={8}>
          {article.heading}
        </ArticlePreview.Heading>
      </Stabilise>
    </Link>
  )
}
