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
import * as Contact from '../components/About/Contact'
import * as CategorySection from '../components/Home/CategorySections'

//import * as Home from '../components/Home'

const GET_CATEGORY_PAGE = gql`
  ${Footer.fragment}
  ${Contact.fragment}
  ${CategorySection.fragment}
  ${Nav.fragment}

  query GetCategoryPage(
    $categoryFilter: JSON!
    $filterArticles: JSON!
    $sortArticles: [TSSearchSort]!
    $size: Int!
  ) {
    getCategoryList(filter: $categoryFilter) {
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

const grid = generateGrid({ rows: { repeat: [2, 'auto'] } })

const Layout = styled.main`
  ${grid.display}
  ${grid.columns}
  ${grid.rows}

  padding: 0 ${({ theme }) => theme.grid.padding};
  margin-bottom: ${convert.viewportUnits(8, { by: 0.4 }).fromRem}; // 8rem

  ${Nav.Wrapper} { ${grid.placeInRows(1)} }

  ${CategorySection.Wrapper}:last-child {
    border-bottom: 0;
  }
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

  return (
    <>
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
          footerVisible={footerVisible}
          active={category}
        />
        <CategorySection.CategorySection
          categorySection={firstCategory}
          initialRows={3}
          showIntros
        />
      </Layout>

      <Footer.Footer
        active={category}
        contact={getContact}
        footer={getFooter}
        navigation={getNavigation}
        onVisibility={setFooterVisible}
      />
    </>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const data = await takeshape.request(GET_CATEGORY_PAGE, {
      categoryFilter: { term: { title: params.category.toLowerCase() } },
      filterArticles: {},
      ...CategorySection.variables(3),
    })
    return { props: { data } }
  } catch (e) {
    return { props: { error: 'Error fetching page contents' } }
  }
}

export default CategoryPage