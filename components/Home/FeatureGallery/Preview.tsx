import styled from 'styled-components'
import Link from 'next/link'

import * as ArticlePreview from '../../ArticlePreview'
import * as Image from '../../blocks/Image'
import * as ImageComponents from '../../blocks/Image/Image.styles'

const Stabilise = styled.div`
  flex-basis: 100%;
  flex-shrink: 0;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-end;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(0, 1fr) auto;

  ${ArticlePreview.FeatureImage} {
    flex-grow: 1;
    display: flex;
  }
`

export const Body = ({ article, i }) => {
  const { previewImage, category, createdAt, slug } = article

  return (
    <Link href={`/${category.title}/${slug}`} passHref>
      <Stabilise as="a">
        <ArticlePreview.FeatureImage>
          <Image.Image
            image={previewImage}
            objectFit="cover"
            inColumns={12}
            imgix={{ ar: '96:80', fit: 'crop' }}
            overrideClip="height: 100%; max-height: auto;"
          />
        </ArticlePreview.FeatureImage>

        <ArticlePreview.Details
          category={category}
          createdAt={createdAt}
          playAnimation={!i}
        />
      </Stabilise>
    </Link>
  )
}

export const Heading = ({ article, i, animation }) => {
  const { heading, category, slug } = article

  return (
    <Link href={`/${category.title}/${slug}`} passHref>
      <Stabilise as="a">
        <ArticlePreview.Heading animation={animation} width={8}>
          {heading}
        </ArticlePreview.Heading>
      </Stabilise>
    </Link>
  )
}
