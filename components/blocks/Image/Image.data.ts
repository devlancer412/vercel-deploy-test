export type ImageType = {
  id: string
  path: string
  caption: {
    blocks: { text: string }[]
  }
}
