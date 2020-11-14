import * as Unstyled from './Unstyled'
import * as Atomic from './Atomic'
import * as PullQuote from './PullQuote'
import * as Header from './Header'

// All these functions have to do, eventually, is return
// an object with { type: String, element: ReactComponent }
// the segment map is held in ../segments/index.tsx and holds
// the UI components that these blocks use.
// The entity map maps blocks to their corresponding item in
// the Takeshape provided entityMap
export const process = (segmentMap, entityMap) => ({
  // TO-DO:
  // hr element
  // code block

  'header-one': Header.process(segmentMap),
  'header-two': Header.process(segmentMap),
  'header-three': Header.process(segmentMap),
  unstyled: Unstyled.process(segmentMap, entityMap),
  pullquote: PullQuote.process(segmentMap),
  blockquote: PullQuote.process(segmentMap), // Please note I don't really know the difference
  atomic: Atomic.process(segmentMap, entityMap),
})
