import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-boost'

const takeShape = '04f6a6a80f0243e78f9620ead68ae15b'
const projectId = '7405be1e-c977-48a3-889c-5b4fd8710464'

// can also be a function that accepts a `context` object (SSR only) and returns a config
const config = {
  link: new HttpLink({
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    uri: `https://api.takeshape.io/project/${projectId}/graphql`, // Server URL
    headers: {
      authorization: `Bearer ${takeShape}`,
    },
  }),
}

export default withData(config)
