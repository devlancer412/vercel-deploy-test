import fetch from 'isomorphic-fetch'

const apiKey = '04f6a6a80f0243e78f9620ead68ae15b'
const projectId = '7405be1e-c977-48a3-889c-5b4fd8710464'

export const url = `https://api.takeshape.io/project/${projectId}/graphql`
export const headers = {
  'Content-Type': 'application/json',
  authorization: `Bearer ${apiKey}`,
}

export const image = (fileName: string) => {}
