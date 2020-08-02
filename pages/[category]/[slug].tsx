import React from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import withData from '../../lib/apollo'
import { generateGrid } from '../../lib/grid'
import * as takeshape from '../../lib/takeshape'

import * as Loading from '../../components/Loading'
import * as Nav from '../../components/Nav'
import * as Article from '../../components/Article'
import * as Footer from '../../components/Footer'
import * as Contact from '../../components/About/Contact'
import * as NextArticle from '../../components/NextArticle'

const ARTICLES_QUERY = gql`
  ${Article.fragment}
  ${Contact.fragment}
  ${Footer.fragment}

  query GetArticlePage($categoryFilter: JSON, $articleFilter: JSON) {
    getCategoryList(filter: $categoryFilter) {
      total

      items {
        _id

        articleSet(filter: $articleFilter) {
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
  ${NextArticle.Wrapper} { ${grid.placeInRows(3, {})} }
`

const ArticlePage = ({ data, error }) => {
  const [footerVisible, setFooterVisible] = React.useState(false)

  const router = useRouter()
  const { category, slug } = router.query

  if (Array.isArray(category)) return <ErrorPage statusCode={404} />
  if (Array.isArray(slug)) return <ErrorPage statusCode={404} />
  if (error || !data) return <ErrorPage statusCode={400} />

  const { getCategoryList, getContact, getFooter } = data
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
        <Nav.Nav footerVisible={footerVisible} />
        <Article.Article article={article} category={category} />
        <NextArticle.NextArticle nextArticle={article.nextArticle} />
      </Layout>

      <Footer.Footer
        contact={getContact}
        footer={getFooter}
        onVisibility={setFooterVisible}
      />
    </>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const data = await takeshape.request(ARTICLES_QUERY, {
      categoryFilter: { term: { title: params.category.toLowerCase() } },
      articleFilter: { term: { slug: params.slug.toLowerCase() } },
    })
    return { props: { data } }
  } catch (e) {
    return { props: { error: 'Error fetching page contents' } }
  }
}

export default ArticlePage
