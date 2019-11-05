import { addDecorator } from '@storybook/react'
import React from 'react'
import { Gallery } from './'

export default {
  component: Gallery,
  title: 'Gallery',
}

const headings = [
  {
    text: 'Unique',
    images: [
      {
        image: {
          path:
            '7405be1e-c977-48a3-889c-5b4fd8710464/dev/f0552b8f-3865-4f1e-8bf0-e24d20df3795/Screen Shot 2019-11-03 at 3.06.54 pm.png',
        },
      },
      {
        image: {
          path:
            '7405be1e-c977-48a3-889c-5b4fd8710464/dev/f0552b8f-3865-4f1e-8bf0-e24d20df3795/Screen Shot 2019-11-03 at 3.06.54 pm.png',
        },
      },
    ],
  },
  {
    text: 'Early',
    images: [
      {
        image: {
          path:
            '7405be1e-c977-48a3-889c-5b4fd8710464/dev/f0552b8f-3865-4f1e-8bf0-e24d20df3795/Screen Shot 2019-11-03 at 3.06.54 pm.png',
        },
      },
      {
        image: {
          path:
            '7405be1e-c977-48a3-889c-5b4fd8710464/dev/f0552b8f-3865-4f1e-8bf0-e24d20df3795/Screen Shot 2019-11-03 at 3.06.54 pm.png',
        },
      },
    ],
  },
]

export const gallery = () => <Gallery content={{ headings }} />
