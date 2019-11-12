import * as Unstyled from './Unstyled'
import * as Atomic from './Atomic'
import * as PullQuote from './PullQuote'

export const process = entityMap => ({
  // TO-DO:
  // header-(one|two|three)
  // blockquote
  // hr element
  // code block

  unstyled: Unstyled.process(entityMap),
  pullquote: PullQuote.process,
  atomic: Atomic.process(entityMap),
})
