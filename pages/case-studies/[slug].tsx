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
import * as CaseStudy from '../../components/CaseStudy'
import * as Footer from '../../components/Footer'
import * as Contact from '../../components/About/Contact'
import * as NextPiece from '../../components/NextPiece'

const CASE_STUDIES_QUERY = gql`
  ${CaseStudy.fragment}
  ${Contact.fragment}
  ${Footer.fragment}
  ${Nav.fragment}

  query GetCaseStudyPage($caseStudyFilter: JSON) {
    getCaseStudyList(filter: $caseStudyFilter, size: 1) {
      total
      items {
        ...CaseStudy
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

const Layout = styled.div`
  ${grid.display}
  ${grid.columns}
  ${grid.rows}

  padding: 0 ${({ theme }) => theme.grid.padding};

  ${Nav.Wrapper} { ${grid.placeInRows(1, {})} }
  ${CaseStudy.Wrapper} { ${grid.placeInRows(1, {})} }
  ${NextPiece.Wrapper} { ${grid.placeInRows(2, {})} }
`

const ArticlePage = ({ data, error }) => {
  const [footerVisible, setFooterVisible] = React.useState(false)

  const router = useRouter()
  const { slug } = router.query

  if (Array.isArray(slug)) return <ErrorPage statusCode={404} />
  if (error || !data) return <ErrorPage statusCode={400} title={error} />

  const { getCaseStudyList, getContact, getFooter, getNavigation } = data
  if (!getCaseStudyList.total) return <ErrorPage statusCode={404} />
  const [caseStudy] = getCaseStudyList.items

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
        <title>{caseStudy.heading} | Early</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>

      <Layout>
        <Nav.Nav navigation={getNavigation} footerVisible={footerVisible} />
        <CaseStudy.CaseStudy caseStudy={caseStudy} />
        {caseStudy.nextCaseStudy && (
          <NextPiece.CaseStudy nextCaseStudy={caseStudy.nextCaseStudy} />
        )}
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
  const filterEnabled = process.env.PREVIEWS
    ? []
    : [{ term: { _enabled: true } }]

  try {
    const data = await takeshape.request(CASE_STUDIES_QUERY, {
      caseStudyFilter: [
        { term: { slug: params.slug.toLowerCase() } },
        ...filterEnabled,
      ],
    })
    return { props: { data } }
  } catch (e) {
    return { props: { error: 'Error fetching page contents' } }
  }
}

export default ArticlePage
