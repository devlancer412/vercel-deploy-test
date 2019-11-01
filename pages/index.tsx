import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import withData from '../lib/apollo'

const GET_HOMEPAGE = gql`
  query getHomepage {
    getHomepage {
      featuredBook {
        title
        author {
          name
        }
      }
    }
  }
`

const Home = () => {
  const { loading, error, data } = useQuery(GET_HOMEPAGE)

  if (loading) return <div>Loading</div>
  if (error || !data) return <div>Error</div>

  return <>{data.getHomepage.featuredBook.title}</>
}

export default withData(Home)
