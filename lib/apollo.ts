import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-boost'

import * as takeshape from './takeshape'

// can also be a function that accepts a `context` object (SSR only) and returns a config
const config = {
  link: new HttpLink({
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    uri: takeshape.url, // Server URL
    headers: takeshape.headers,
  }),
}

export default withData(config)
