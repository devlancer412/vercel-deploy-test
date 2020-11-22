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
import * as CaseStudyScopeSection from '../components/Home/CaseStudyScopeSection'

//import * as Home from '../components/Home'

const INITIAL_ROWS = 3

const GET_CASE_STUDIES_PAGE = gql`
  ${Footer.fragment}
  ${Contact.fragment}
  ${CaseStudyScopeSection.fragment}
  ${Nav.fragment}

  query GetCaseStudiesPage(
    $caseStudyScopeWhere: TSWhereCaseStudyScopeInput!
    $caseStudyFilter: JSON!
    $caseStudySort: [TSSearchSort]!
    $size: Int!
  ) {
    getCaseStudyScopeList(where: $caseStudyScopeWhere, size: 1) {
      total

      items {
        ...CaseStudyScopeSection
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

  ${CaseStudyScopeSection.Wrapper}:last-child {
    border-bottom: 0;
  }
`

const CaseStudyPage = ({ error, data }) => {
  const [footerVisible, setFooterVisible] = React.useState(false)

  const router = useRouter()

  if (error || !data) return <ErrorPage statusCode={400} title={error} />

  const { getCaseStudyScopeList, getContact, getFooter, getNavigation } = data
  if (!getCaseStudyScopeList.total) return <ErrorPage statusCode={404} />
  const [firstCaseStudyScope] = getCaseStudyScopeList.items

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
        <title>Case Studies | Early</title>

        <meta itemProp="name" content={'Case Studies'} />
        <meta property="og:title" content={'Case Studies'} />

        <meta property="og:url" content={`//veryearly.studio/case-studies`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={'Case Studies'} />
      </Head>

      <Layout>
        <Nav.Nav
          navigation={getNavigation}
          footerVisible={footerVisible}
          active={'case-studies'}
        />
        <CaseStudyScopeSection.CaseStudyScopeSection
          caseStudyScopeSection={firstCaseStudyScope}
          initialRows={INITIAL_ROWS}
        />
      </Layout>

      <Footer.Footer
        active={'case-studies'}
        contact={getContact}
        footer={getFooter}
        navigation={getNavigation}
        onVisibility={setFooterVisible}
      />
    </>
  )
}

const WHERE_ENABLED = process.env.PREVIEWS ? {} : { _enabled: { eq: true } }
const FILTER_ENABLED = process.env.PREVIEWS
  ? []
  : [{ term: { _enabled: true } }]

export async function getServerSideProps({ params }) {
  try {
    const data = await takeshape.request(GET_CASE_STUDIES_PAGE, {
      caseStudyScopeWhere: { title: { eq: 'Case Studies' }, ...WHERE_ENABLED },
      caseStudyFilter: FILTER_ENABLED,
      ...CaseStudyScopeSection.variables(INITIAL_ROWS),
    })
    return { props: { data } }
  } catch (e) {
    return { props: { error: 'Error fetching page contents' } }
  }
}

export default CaseStudyPage
