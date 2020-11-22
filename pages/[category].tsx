import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { getImageUrl } from 'takeshape-routing'

import withData from '../lib/apollo'
import { generateGrid } from '../lib/grid'
import * as convert from '../lib/convert'
import * as takeshape from '../lib/takeshape'

import * as Nav from '../components/Nav'
import * as Footer from '../components/Footer'
import * as Loading from '../components/Loading'
import * as NoItems from '../components/NoItems'
import * as Contact from '../components/About/Contact'
import * as CategorySection from '../components/Home/CategorySections'

const GET_CATEGORY_PAGE = gql`
  ${Footer.fragment}
  ${Contact.fragment}
  ${CategorySection.fragment}
  ${Nav.fragment}

  query GetCategoryPage(
    $categoryWhere: TSWhereCategoryInput!
    $articleFilter: JSON!
    $articleSort: [TSSearchSort]!
    $size: Int!
  ) {
    getCategoryList(where: $categoryWhere, size: 1) {
      total

      items {
        ...CategorySection
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

const grid = {
  layout: generateGrid({ rows: { repeat: [2, 'auto'] } }),
  page: generateGrid({ rows: { exact: 'auto min-content' } }),
}

const Layout = styled.main`
  ${grid.layout.display}
  ${grid.layout.columns}
  ${grid.layout.rows}
  grid-column: 1 / -1;

  padding: 0 ${({ theme }) => theme.grid.padding};
  margin-bottom: ${convert.viewportUnits(8, { by: 0.4 }).fromRem}; // 8rem

  ${Nav.Wrapper} { ${grid.layout.placeInRows(1)} }

  ${CategorySection.Wrapper}:last-child {
    border-bottom: 0;
  }
`

const Page = styled.div`
  ${grid.page.display}
  ${grid.page.columns}
  ${grid.page.rows}
  min-height: 100vh;
`

const CategoryPage = ({ error, data }) => {
  const [footerVisible, setFooterVisible] = React.useState(false)

  const router = useRouter()
  const { category } = router.query

  if (Array.isArray(category)) return <ErrorPage statusCode={404} />

  if (error || !data) return <ErrorPage statusCode={400} title={error} />

  const { getCategoryList, getContact, getFooter, getNavigation } = data
  if (!getCategoryList.total) return <ErrorPage statusCode={404} />
  const [firstCategory] = getCategoryList.items

  React.useEffect(() => {
    if (window) {
      require('lazysizes')
      // @ts-ignore
      window.lazySizesConfig = window.lazySizesConfig || {}
      // @ts-ignore
      window.lazySizesConfig.expand = 0
    }
  }, [])

  const pageTitle = category.charAt(0).toUpperCase() + category.slice(1)
  const hasContent = CategorySection.hasArticles(firstCategory)

  return (
    <Page>
      <Head>
        <title>{pageTitle} | Early</title>

        <meta itemProp="name" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />

        <meta property="og:url" content={`//veryearly.studio/${category}`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={pageTitle} />
      </Head>

      <Layout>
        <Nav.Nav
          navigation={getNavigation}
          footerVisible={hasContent && footerVisible}
          active={category}
        />
        {hasContent ? (
          <CategorySection.CategorySection
            categorySection={firstCategory}
            initialRows={3}
            showIntros
          />
        ) : (
          <NoItems.NoItems title={pageTitle} />
        )}
      </Layout>

      <Footer.Footer
        active={category}
        contact={getContact}
        footer={getFooter}
        navigation={getNavigation}
        onVisibility={setFooterVisible}
      />
    </Page>
  )
}

const WHERE_ENABLED = process.env.PREVIEWS ? {} : { _enabled: { eq: true } }
const FILTER_ENABLED = process.env.PREVIEWS
  ? []
  : [{ term: { _enabled: true } }]

export async function getServerSideProps({ params }) {
  try {
    const data = await takeshape.request(GET_CATEGORY_PAGE, {
      categoryWhere: {
        title: { eq: params.category.toLowerCase() },
        ...WHERE_ENABLED,
      },
      articleFilter: FILTER_ENABLED,
      ...CategorySection.variables(3),
    })
    return { props: { data } }
  } catch (e) {
    return { props: { error: 'Error fetching page contents' } }
  }
}

export default CategoryPage
