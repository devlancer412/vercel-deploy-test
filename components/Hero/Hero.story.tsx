import { addDecorator } from '@storybook/react'
import React from 'react'
import { Hero } from './'

export default {
  component: Hero,
  title: 'Hero',
}

const wrapper = {
  padding: '20px 100px',
  height: '200vh',
}

const hello = {
  height: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const click = {
  gridColumn: '5 / -5',
  textAlign: 'center',
}

export const hero = () => (
  <div style={wrapper}>
    <Hero>
      <div style={click}>Click the button 👇🏻</div>
    </Hero>

    <div style={hello}>Hello!</div>
  </div>
)
