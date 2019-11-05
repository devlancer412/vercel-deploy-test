import { addDecorator } from '@storybook/react'
import React from 'react'
import { AboutShort } from './'

export default {
  component: AboutShort,
  title: 'AboutShort',
}

const content = `
We are a nucleus of celebrated *brand strategists*, *cultural connectors* and *publishers*, with an influential halo network of best in class creative, content and communication specialists. Setting a new agenda for compelling brand marketing.
`

const wrapper = {
  padding: '20px 100px',
}

export const aboutShort = () => (
  <div style={wrapper}>
    <AboutShort details={{ content }} />
  </div>
)
