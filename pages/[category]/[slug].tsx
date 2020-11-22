import React from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import styled from 'styled-components'
import gql from 'graphql-tag'

import { generateGrid } from '../../lib/grid'
import * as takeshape from '../../lib/takeshape'

import * as Loading from '../../components/Loading'
import * as Nav from '../../components/Nav'
import * as Article from '../../components/Article'
import * as Footer from '../../components/Footer'
import * as Contact from '../../components/About/Contact'
import * as NextPiece from '../../components/NextPiece'

const ARTICLES_QUERY = gql`
  ${Article.fragment}
  ${Contact.fragment}
  ${Footer.fragment}
  ${Nav.fragment}

  query GetArticlePage(
    $categoryWhere: TSWhereCategoryInput!
    $articleFilter: JSON!
  ) {
    getCategoryList(where: $categoryWhere, size: 1) {
      total

      items {
        _id

        articleSet(filter: $articleFilter, size: 1) {
          total
          items {
            ...Article
          }
        }
      }
    }

    getContact {
      ...Contact
    }

    getFooter {
      ...Footer
    }

    getNavigation {
      ...Navigation
    }
  }
`

const grid = generateGrid({ rows: { repeat: [3, 'auto'] } })

const Layout = styled.div`
  ${grid.display}
  ${grid.columns}
  ${grid.rows}

  padding: 0 ${({ theme }) => theme.grid.padding};

  ${Nav.Wrapper} { ${grid.placeInRows(1, {})} }
  ${Article.Wrapper} { ${grid.placeInRows(2, {})} }
  ${NextPiece.Wrapper} { ${grid.placeInRows(3, {})} }
`

const ArticlePage = ({ data, error }) => {
  const [footerVisible, setFooterVisible] = React.useState(false)

  const router = useRouter()
  const { category, slug } = router.query

  if (Array.isArray(category)) return <ErrorPage statusCode={404} />
  if (Array.isArray(slug)) return <ErrorPage statusCode={404} />
  if (error || !data) return <ErrorPage statusCode={400} />

  const { getCategoryList, getContact, getFooter, getNavigation } = data
  if (!getCategoryList.total) return <ErrorPage statusCode={404} />
  const [firstCategory] = getCategoryList.items

  const articleList = firstCategory.articleSet
  if (!articleList.total) return <ErrorPage statusCode={404} />
  const [article] = articleList.items

  React.useEffect(() => {
    if (window) {
      require('lazysizes')
      // @ts-ignore
      window.lazySizesConfig = window.lazySizesConfig || {}
      // @ts-ignore
      window.lazySizesConfig.expand = 0
    }
  }, [])

  return (
    <>
      <Head>
        <title>{article.heading} | Early</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>

      <Layout>
        <Nav.Nav navigation={getNavigation} footerVisible={footerVisible} />
        <Article.Article article={article} category={category} />
        <NextPiece.Article nextArticle={article.nextArticle} />
      </Layout>

      <Footer.Footer
        contact={getContact}
        footer={getFooter}
        navigation={getNavigation}
        onVisibility={setFooterVisible}
      />
    </>
  )
}

export async function getServerSideProps({ params }) {
  const whereEnabled = process.env.PREVIEWS ? {} : { _enabled: { eq: true } }
  const filterEnabled = process.env.PREVIEWS
    ? []
    : [{ term: { _enabled: true } }]

  try {
    const data = await takeshape.request(ARTICLES_QUERY, {
      categoryWhere: {
        title: { eq: params.category.toLowerCase() },
        ...whereEnabled,
      },
      articleFilter: [
        { term: { slug: params.slug.toLowerCase() } },
        ...filterEnabled,
      ], // They don't have any docs on this format, which is why I am not using it where I can, but this array means an implicit AND
    })
    return { props: { data } }
  } catch (e) {
    return { props: { error: 'Error fetching page contents' } }
  }
}

export default ArticlePage
