import styled from 'styled-components'
import Link from 'next/link'

import * as ArticlePreview from '../../ArticlePreview'
import * as Image from '../../blocks/Image'

const Stabilise = styled.div`
  flex-basis: 100%;
  flex-shrink: 0;
`

export const Body = ({ article, i }) => {
  const { previewImage, category, createdAt } = article

  return (
    <Stabilise>
      <ArticlePreview.FeatureImage>
        <Image.Image
          image={previewImage}
          objectFit="cover"
          inColumns={12}
          imgix={{ ar: '1105:503', fit: 'crop' }}
        />
      </ArticlePreview.FeatureImage>

      <ArticlePreview.Details category={category} createdAt={createdAt} />
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
