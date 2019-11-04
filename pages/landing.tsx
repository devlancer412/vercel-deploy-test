import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

import withData from '../lib/apollo'
import * as LandingPage from '../components/LandingPage/LandingPage'

const Home = () => {
  const { loading, error, data } = useQuery(LandingPage.GET_LANDING_PAGE)

  if (loading) return <div>Loading</div>
  if (error || !data) return <div>Error</div>

  return <LandingPage.LandingPage content={data.getLandingPage} />
}

export default withData(Home)
