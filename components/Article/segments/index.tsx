import * as Image from './Image'
import * as Gallery from './Gallery'

export const map = {
  // TO-DO:
  // inline code

  LINK({ text }) {
    return <a href="">{text}</a>
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

  image({ entity }: any) {
    const { data } = entity
    return <Image.Image image={data} />
  },

  gallery(segments) {
    const data = segments.map(({ entity }) => entity.data)
    return <Gallery.Gallery images={data} />
  },
}
