import React, { ReactNode } from 'react'

type HighlightedText = (r: string, h: any) => (string | ReactNode)[]
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
