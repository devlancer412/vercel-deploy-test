import React, { ReactNode } from 'react'
import { StyledComponent } from 'styled-components'

type Highlighter = StyledComponent<'span', any, {}, never>
type HighlightedText = (r: string, h: Highlighter) => (string | ReactNode)[]
export const highlightedText: HighlightedText = (rawText, Highlighter) => {
  const inAsterisks = RegExp(/\*([^*]+)\*/g)

  const transformString = string => {
    if (!inAsterisks.test(string)) return string
    const wrappedString = string.slice(1, -1)

    return <Highlighter key={string}>{wrappedString}</Highlighter>
  }

  return rawText
    .replace(inAsterisks, '%*$1*%')
    .split('%')
    .map(transformString)
}
