import { ref, reactive } from 'vue'
import type { Sentence } from '@/types/Sentence'
import { useTranslationStore } from '@/stores/TranlationStore'

export function useTranslationCard(translationStore = useTranslationStore()) {
  const sentenceTranslationCard = reactive({
    show: false,
    original: '',
    text: '',
    loading: false,
    error: false,
    x: 0,
    y: 0,
  })

  const wordTranslationCard = reactive({
    show: false,
    word: '',
    transcription: '',
    definitions: [] as Array<{
      pos: string
      translations: Array<{
        text: string
        aspect?: string
        meanings: string[]
      }>
    }>,
    loading: false,
    error: false,
    x: 0,
    y: 0,
  })

  const closeTranslationCard = () => {
    sentenceTranslationCard.show = false
    document.removeEventListener('click', closeTranslationCard)
  }

  const closeWordTranslationCard = () => {
    wordTranslationCard.show = false
    document.removeEventListener('click', closeWordTranslationCard)
  }

  const showSentenceTranslation = (sentence: Sentence, event: MouseEvent) => {
    sentenceTranslationCard.original = sentence.originalText
    sentenceTranslationCard.text = sentence.translatedText
    sentenceTranslationCard.x = event.clientX
    sentenceTranslationCard.y = event.clientY
    sentenceTranslationCard.show = true
    setTimeout(() => {
      document.addEventListener('click', closeTranslationCard, { once: true })
    }, 10)
  }

  const showWordTranslation = async (word: string, event: MouseEvent) => {
    try {
      wordTranslationCard.word = word
      wordTranslationCard.loading = true
      wordTranslationCard.error = false

      const wordTranslation = await translationStore.getTranslation(word)

      if (wordTranslation) {
        wordTranslationCard.show = true
        wordTranslationCard.x = event.clientX
        wordTranslationCard.y = event.clientY
      }
      wordTranslationCard.transcription = wordTranslation.definitions[0]?.ts || ''
      wordTranslationCard.definitions = wordTranslation.definitions.map(
        (def: {
          pos: string
          translations: Array<{
            text: string
            asp?: string
            meanings: string[]
          }>
        }) => ({
          pos: def.pos,
          translations: def.translations.map(
            (tr: { text: string; asp?: string; meanings: string[] }) => ({
              text: tr.text,
              aspect: tr.asp,
              meanings: tr.meanings,
            }),
          ),
        }),
      )
    } catch (err) {
      wordTranslationCard.error = true
    } finally {
      wordTranslationCard.loading = false
    }

    setTimeout(() => {
      document.addEventListener('click', closeWordTranslationCard, { once: true })
    }, 10)
  }

  return {
    sentenceTranslationCard,
    wordTranslationCard,
    showSentenceTranslation,
    showWordTranslation,
  }
}
