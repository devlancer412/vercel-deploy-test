import { css, StyledFunction } from 'styled-components'

import * as convert from '../../../lib/convert'

import * as Image from './Image'
import * as Oembed from './Oembed'
import * as Gallery from './Gallery'
import * as Link from './Link'
import * as Underline from './Underline'
import * as PullQuote from './PullQuote'
import * as Unstyled from './Unstyled'
import * as Header from './Header'
import * as Empty from './Empty'

export type Config = {
  pullquote?: { PullQuote: React.ComponentClass; Wrapper: any }
}

const components = (config: Config) => ({
  Empty: Empty,
  Unstyled: Unstyled,
  Header: Header,
  Link: Link,
  Underline: Underline,
  PullQuote: config.pullquote || PullQuote,
  Oembed: Oembed,
  Image: Image,
  Gallery: Gallery,
})

//   ${Image.Wrapper}:first-child, ${Oembed.Wrapper}:first-child, ${Gallery.Wrapper}:first-child
// How all these components interact with each other.
// So many margins!
export const interactions = config => {
  const c = components(config)

  const atomics = creator => {
    return css`${creator(c.Image.Wrapper)}, ${creator(
      c.Gallery.Wrapper
    )}, ${creator(c.Oembed.Wrapper)}`
  }

  return css`
    ${atomics(
      w =>
        css`
          ${w}: first-child
        `
    )} {
      margin-top: ${convert.viewportUnits(6.3, { by: 0.625 }).fromRem};
    }
    ${atomics(w => css`${w} + ${c.Unstyled.Wrapper}`)} {
      margin-top: ${convert.viewportUnits(12, { by: 0.625 }).fromRem};
    }

    ${atomics(w => css`${c.Unstyled.Wrapper} + ${w}`)} {
      margin-top: ${convert.viewportUnits(11.2, { by: 0.625 }).fromRem};
    }

    ${atomics(w => css`${w} + ${c.Image.Wrapper}`)} {
      margin-top: ${convert.viewportUnits(6.4, { by: 0.625 }).fromRem};
    }

    ${atomics(w => css`${w} + ${c.Oembed.Wrapper}`)} {
      margin-top: ${convert.viewportUnits(6.4, { by: 0.625 }).fromRem};
    }

    ${atomics(w => css`${w} + ${c.Gallery.Wrapper}`)} {
      margin-top: ${convert.viewportUnits(6.4, { by: 0.625 }).fromRem};
    }

    ${atomics(w => css`${c.Empty.Wrapper} + ${w}`)} {
      margin-top: ${convert.viewportUnits(6.4, { by: 0.625 }).fromRem};
    }

    ${atomics(w => css`${w} + ${c.PullQuote.Wrapper}`)} {
      margin-top: ${convert.viewportUnits(20, { by: 0.625 }).fromRem};
    }

    ${atomics(w => css`${c.PullQuote.Wrapper} + ${w}`)} {
      margin-top: ${convert.viewportUnits(10, { by: 0.625 }).fromRem};
    }

    ${c.Unstyled.Wrapper} + ${c.PullQuote.Wrapper} {
      margin-top: ${convert.viewportUnits(6.8, { by: 0.625 }).fromRem};
    }

    ${c.PullQuote.Wrapper} + ${c.Unstyled.Wrapper} {
      margin-top: ${convert.viewportUnits(7.8, { by: 0.625 }).fromRem};
    }
  `
}

// This maps processed blocks to corresponding UI components
// The UI components can be overriden by passing in new functions
// to the config object. This allows for customisable rich text.
// This is made use of for the Case Study page, which has slightly
// different styles for images and pullquotes.
export const map = config => {
  const c = components(config)

  return {
    // TO-DO:
    // inline code
    empty() {
      // An empty whitespace line. Used as a grid divider to stop
      // images sitting in the same row as each other.
      return <c.Empty.Empty />
    },

    unstyled(children) {
      return <c.Unstyled.Unstyled>{children}</c.Unstyled.Unstyled>
    },

    'header-one'(text) {
      return <c.Header.Header type="header-one" text={text} />
    },

    'header-two'(text) {
      return <c.Header.Header type="header-two" text={text} />
    },

    'header-three'(text) {
      return <c.Header.Header type="header-three" text={text} />
    },

    LINK({ text, entity }) {
      const { url, target } = entity.data
      return <c.Link.Link text={text} url={url} target={target} />
    },

    BOLD({ text }) {
      return <strong>{text}</strong>
    },

    ITALIC({ text }) {
      return <em>{text}</em>
    },

    UNDERLINE({ text }) {
      return <c.Underline.Underline>{text}</c.Underline.Underline>
    },

    SUP({ text }) {
      return <sup>{text}</sup>
    },

    SUB({ text }) {
      return <sub>{text}</sub>
    },

    pullquote(text) {
      return <c.PullQuote.PullQuote quote={text} />
    },

    oembed({ entity }) {
      const { data } = entity
      return <c.Oembed.Oembed html={data.html} />
    },

    image({ entity }: any) {
      const { data } = entity
      return <c.Image.Image image={data} />
    },

    gallery(segments) {
      const data = segments.map(({ entity }) => entity.data)
      return <c.Gallery.Gallery images={data} />
    },
  }
}
