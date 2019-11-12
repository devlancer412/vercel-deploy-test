import React from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import withData from '../../lib/apollo'

import * as Loading from '../../components/Loading'
import * as Article from '../../components/Article'
import * as Footer from '../../components/Footer'
import * as Contact from '../../components/About/Contact'

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

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 40px;
  grid-template-rows:
    [header] fit-content
    [subHeader] fit-content
    [intro] fit-content
    [content] fit-content
    [footer] fit-content;
`

const ArticlePage = () => {
  const router = useRouter()
  const { category, slug } = router.query

  if (Array.isArray(category)) return <ErrorPage statusCode={404} />
  if (Array.isArray(slug)) return <ErrorPage statusCode={404} />

  const { loading, error, data } = useQuery(ARTICLES_QUERY, {
    variables: {
      categoryFilter: { term: { title: category.toLowerCase() } },
      articleFilter: { term: { slug: slug.toLowerCase() } },
    },
  })

  if (loading) return <Loading.Loading />
  if (error || !data) return <ErrorPage statusCode={404} />

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
    <Layout>
      <Article.Article article={article} category={category} />
      <Footer.Footer contact={getContact} footer={getFooter} />
    </Layout>
  )
}

export default withData(ArticlePage)
