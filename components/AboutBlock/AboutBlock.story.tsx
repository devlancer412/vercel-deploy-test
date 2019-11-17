import React from 'react'
import { Column, Row } from './'

export default {
  component: Row,
  title: 'AboutBlock',
}

export const withColumnHeadings = () => (
  <Row title="Hello world!">
    <Column title="Column with header">beep beep</Column>

    <Column title="Column 2">Column</Column>
  </Row>
)

export const withoutColumnHeadings = () => (
  <Row title="Hello world!">
    <Column>beep beep</Column>

    <Column>Column</Column>
  </Row>
)
