export interface WordTranslation {
  definitions: Array<{
    text: string
    pos: string
    ts: string
    translations: Array<{
      text: string
      pos: string
      asp?: string
      gen?: string
      fr: number
      meanings: string[]
    }>
  }>
  code: number
}
