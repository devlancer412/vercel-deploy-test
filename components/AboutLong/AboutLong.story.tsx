import { addDecorator } from '@storybook/react'
import React from 'react'
import { AboutLong } from './'

export default {
  component: AboutLong,
  title: 'AboutLong',
}

const content = `
    EARLY develop personalities for brands; connective communications that drive desire around product.

    We design tailored brand solutions that drive affinity, navigating the complexities of demanding audiences, saturated commercial markets and cluttered content landscapes.

    EARLY help brands to behave like publishers, to speak in a voice that consumers want to listen to. We do this by creating great content and communications that travels organically; earning media, and saving millions of dollars in ad spend.
`

const wrapper = {
  padding: '20px 100px',
}

export const aboutLong = () => (
  <div style={wrapper}>
    <AboutLong details={{ content }} />
  </div>
)
