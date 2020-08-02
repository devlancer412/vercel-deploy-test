const { print } = require('graphql/language/printer')
const { GraphQLClient } = require('graphql-request')

const apiKey = '04f6a6a80f0243e78f9620ead68ae15b'
const projectId = '7405be1e-c977-48a3-889c-5b4fd8710464'

export const url = `https://api.takeshape.io/project/${projectId}/graphql`
export const headers = {
  'Content-Type': 'application/json',
  authorization: `Bearer ${apiKey}`,
}

const client = new GraphQLClient(url, { headers })

export const request = (tag, variables) => {
  return client.request(print(tag), variables)
}
