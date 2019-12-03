import React from 'react'
import { Footer } from './'

export default {
  component: Footer,
  title: 'Footer',
}

const footer = {
  copyright: 'copyright',
}

const contact = {
  email: 'email',
  phoneNumber: 'phoneNumber',
  address: {
    line1: 'address line 1',
    line2: 'address line 2',
  },
  socials: [
    { name: 'social', acronym: 'AC', url: '/?path=/story/footer--tooter' },
  ],
}

export const tooter = () => <Footer contact={contact} footer={footer} />
