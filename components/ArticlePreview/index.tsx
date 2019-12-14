import React from 'react'
import { gql } from 'apollo-boost'
import NextLink from 'next/link'

import * as animate from '../../lib/animate'

import * as styles from './ArticlePreview.styles'

import * as Image from '../blocks/Image'

export const fragment = gql`
  fragment ArticlePreview on Article {
    _id
    heading
    previewImage {
      path
    }
    intro
    createdAt: _enabledAt
    category {
      title
    }
    slug
  }
`

export const aspectRatio = {
  12: [199, 114],
  7: [153, 86],
  6: [130, 73],
  4: [105, 59],
  1: [182, 105],
}

export const Details = ({ category, createdAt }) => {
  const [ref, animation] = animate.useDefaultAnimation()

  const [createdAtDate] = createdAt.split('T')
  const [yearLong, month, day] = createdAtDate.split('-')
  const yearShort = yearLong.slice(2)

  return (
    <styles.Details animation={animation} ref={ref}>
      <span>{category.title}</span>
      <time>28.09.19</time>
    </styles.Details>
  )
}

export const Splash = ({ previewImage, width, position = null }) => (
  <Image.Image
    image={previewImage}
    imgix={{ ar: aspectRatio[width].join(':'), fit: 'crop' }}
    objectFit="cover"
    setRatio={aspectRatio[width]}
    inColumns={width}
  />
)

export const Intro = styles.Intro
export const Heading = styles.Heading

const Link = ({ category, slug, children }) => (
  <NextLink href={`/${category.title}/${slug}`} passHref>
    {children}
  </NextLink>
)

export const Body = ({
  articlePreview,
  headingWidth = 10,
  withoutIntro = false,
  fullIntro = false,
  withoutHeading = false,
}) => {
  const { heading, intro, category, createdAt, slug } = articlePreview

  const [introRef, introAnimation] = animate.useDefaultAnimation()
  const [headerRef, headerAnimation] = animate.useDefaultAnimation()

  return (
    <>
      <Details category={category} createdAt={createdAt} />
      {!withoutHeading && (
        <styles.Heading
          width={headingWidth}
          animation={headerAnimation}
          ref={headerRef}
        >
          {heading}
        </styles.Heading>
      )}
      {!withoutIntro && (
        <styles.Intro
          fullIntro={fullIntro}
          animation={introAnimation}
          ref={introRef}
        >
          {intro}
        </styles.Intro>
      )}
    </>
  )
}

export const ArticlePreview = ({ articlePreview, width, ...bodyProps }) => {
  const { previewImage, category, slug } = articlePreview

  const [imageRef, imageAnimation] = animate.useDefaultAnimation()

  const [widthRatio, heightRatio] = aspectRatio[width]
  const scale = (heightRatio * 100) / widthRatio

  return (
    <Link category={category} slug={slug}>
      <styles.Wrapper>
        <styles.FeatureImage ref={imageRef} animation={imageAnimation}>
          <Splash
            previewImage={previewImage}
            width={width}
            position="absolute"
          />
        </styles.FeatureImage>

        <Body articlePreview={articlePreview} {...bodyProps} />
      </styles.Wrapper>
    </Link>
  )
}
