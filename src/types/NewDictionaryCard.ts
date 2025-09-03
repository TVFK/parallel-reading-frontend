export interface NewDictionaryCard {
  word: string
  translation: string
  context: string
  difficulty: number
  tags?: string[]
}
