import styled from 'styled-components'
import Link from 'next/link'

import * as ArticlePreview from '../../ArticlePreview'
import * as Image from '../../blocks/Image'
import * as ImageComponents from '../../blocks/Image/Image.styles'

const mediaTouchScreen = '@media (hover: none) and (max-width: 649px)'

const FeatureImage = styled(ArticlePreview.FeatureImage)`
  flex-grow: 1;
  display: flex;
`

const PreviewHeading = styled(ArticlePreview.Heading)`
  width: 80%;

  ${mediaTouchScreen} {
    width: 100%;
  }
`

const Stabilise = styled.div`
  flex-basis: 100%;
  flex-shrink: 0;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(0, 1fr) auto;
`

export const Body = ({ article, i }) => {
  const { previewImage, category, createdAt, slug } = article

  return (
    <Link href={`/${category.title}/${slug}`} passHref>
      <Stabilise as="a">
        <FeatureImage>
          <Image.Image
            image={previewImage}
            objectFit="cover"
            inColumns={12}
            imgix={{ ar: '96:80', fit: 'crop' }}
            overrideClip="height: 100%; max-height: auto;"
          />
        </FeatureImage>

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
        <PreviewHeading animation={animation}>{heading}</PreviewHeading>
      </Stabilise>
    </Link>
  )
}
