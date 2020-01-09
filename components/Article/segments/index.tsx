import * as Image from './Image'
import * as Oembed from './Oembed'
import * as Gallery from './Gallery'
import * as Link from './Link'

export const map = {
  // TO-DO:
  // inline code

  LINK({ text, entity }) {
    const { url, target } = entity.data
    return <Link.Link text={text} url={url} target={target} />
  },

  BOLD({ text }) {
    return <strong>{text}</strong>
  },

  ITALIC({ text }) {
    return <em>{text}</em>
  },

  UNDERLINE({ text }) {
    return <u>{text}</u>
  },

  SUP({ text }) {
    return <sup>{text}</sup>
  },

  SUB({ text }) {
    return <sub>{text}</sub>
  },

  oembed({ entity }) {
    const { data } = entity
    return <Oembed.Oembed html={data.html} />
  },

  image({ entity }: any) {
    const { data } = entity
    return <Image.Image image={data} />
  },

  gallery(segments) {
    const data = segments.map(({ entity }) => entity.data)
    return <Gallery.Gallery images={data} />
  },
}
