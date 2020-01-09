import * as Unstyled from './Unstyled'
import * as Atomic from './Atomic'
import * as PullQuote from './PullQuote'
import * as Header from './Header'

export const process = entityMap => ({
  // TO-DO:
  // blockquote
  // hr element
  // code block

  'header-one': Header.process,
  'header-two': Header.process,
  'header-three': Header.process,
  unstyled: Unstyled.process(entityMap),
  pullquote: PullQuote.process,
  atomic: Atomic.process(entityMap),
})
